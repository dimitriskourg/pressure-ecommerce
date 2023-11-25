<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar, Zoom } from 'swiper/modules'
import MainLayout from '~/layouts/MainLayout.vue'
import { useUserStore } from '~/stores/user'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/zoom'

const { id } = useRoute().params
const userStore = useUserStore()
const modules = [Navigation, Scrollbar, Zoom]

const { data: product } = await useFetch('/api/product')

const isImageExpanded = ref(false)
const currentImageIndex = ref(0)
const addToCartText = ref('Add to cart')
const addedToCart = ref(false)
const addToWishListText = ref('Add to wishlist')
const addedToWishList = ref(false)
const selectedSizeWarning = ref(false)

const selectedSize = ref(null)

function handleCurrentImageIndexChange(swiper) {
  currentImageIndex.value = swiper.activeIndex
}

function handleIsImageExpanded() {
  isImageExpanded.value = !isImageExpanded.value
}

function handleShareProduct() {
  if (navigator.share) {
    navigator
      .share({
        title: product.value.title,
        text: product.value.description,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch(error => console.log('Error sharing', error))
  }
}

function handleAddToCart(product) {
  // TODO add to cart
  if (!selectedSize.value) {
    selectedSizeWarning.value = true
    setTimeout(() => {
      selectedSizeWarning.value = false
    }, 2000)
    return
  }
  console.log('add to cart', product)
  addToCartText.value = 'Added to cart'
  addedToCart.value = true
  userStore.addToCart(product, selectedSize.value, crypto.randomUUID())
  setTimeout(() => {
    addToCartText.value = 'Add to cart'
    addedToCart.value = false
  }, 2000)
}

function handleAddedToWishList() {
  addToWishListText.value = 'Added to wishlist'
  addedToWishList.value = true
  setTimeout(() => {
    addToWishListText.value = 'Add to wishlist'
    addedToWishList.value = false
  }, 2000)
}

function handleSizeSelection(size) {
  console.log('size selected:', size)
  selectedSize.value = size
}
</script>

<template>
  <MainLayout>
    <div id="ProductPage" class="mt-4 max-w-[1400px] mx-auto px-8 min-h-[60vh]">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[50%] text-white">
          <!-- TODO add zoom in and open the swiper as a modal -->
          <Swiper
            :scrollbar="{ draggable: true }"
            navigation
            zoom
            :modules="modules"
            class="mySwiper"
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-navigation-size': '25px',
            }"
            @active-index-change="handleCurrentImageIndexChange"
          >
            <SwiperSlide v-for="(image, index) in product.images" :key="index">
              <div class="swiper-zoom-container object-contain">
                <!-- Image element with expand icon overlay -->
                <img :src="image" class="max-w-90 max-h-90 object-contain" :class="{ 'w-full h-full': isImageExpanded }">
                <div v-if="!isImageExpanded" class="absolute bottom-4 right-4  text-black rounded p-2">
                  <button class="text-white" @click="handleIsImageExpanded">
                    <Icon name="ion:expand" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="md:w-[50%] bg-white p-3 rounded-md">
          <CommonRating :rating="product.rating" :num-reviews="product.numReviews" />

          <ProductPageComponentsProductDetails :product="product" />

          <ProductPageComponentsSizeSelection :available-sizes="product.sizes" @size-selected="handleSizeSelection" />

          <div class="my-10 flex flex-col items-center justify-center max-w-[70%]">
            <!-- Button for  add to cart -->
            <button
              class="bg-black text-white py-2 my-3 w-full rounded-3xl font-medium uppercase flex items-center justify-center hover:bg-gray-600 transition duration-200"
              :class="{ 'bg-green-500 hover:bg-green-500 transition duration-200': addedToCart }"
              @click="handleAddToCart(product)"
            >
              <Icon name="ion:bag-sharp" size="18" />
              <span class="ml-2">{{ addToCartText }}</span>
            </button>

            <!-- Button for  add to wishlist -->
            <button
              class="bg-slate-400 text-white py-2 my-2 w-full rounded-3xl font-medium uppercase flex items-center justify-center hover:bg-slate-500 transition duration-200"
              :class="{ 'bg-green-500 hover:bg-green-500 transition duration-200': addedToWishList }"
              @click="handleAddedToWishList(product)"
            >
              <Icon name="mingcute:heart-line" size="18" />
              <span class="ml-2">{{ addToWishListText }}</span>
            </button>
          </div>

          <!-- Warning if no size has selected -->
          <div v-if="selectedSizeWarning" class="text-red-500 text-sm bg-rose-100 rounded-md my-4 p-2">
            Please select a size
          </div>

          <ProductPageComponentsProductDescription :description="product.description" title="Description" border-class="border-y-2" />

          <ProductPageComponentsProductDescription :description="product.sizeGuide" title="Fit" class="mt-1" border-class="border-b-2" />

          <!-- Share button -->
          <div>
            <button
              class=" text-black px-2 py-2 my-4 rounded-3xl font-medium uppercase flex items-center justify-center hover:text-slate-800 transition duration-200" @click="handleShareProduct"
            >
              <Icon name="material-symbols:upload" size="20" />
              <span class="ml-1 underline">Share</span>
            </button>
          </div>
        </div>
      </div>

      <!-- zoomed Image -->
      <div
        v-if="isImageExpanded"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="relative">
          <button class="absolute top-4 right-4 text-white" @click="handleIsImageExpanded">
            <Icon name="ion:close" class="w-8 h-8" />
          </button>
          <img
            :src="product.images[currentImageIndex]"
            class="max-w-[90vw] max-h-[90vh] object-contain"
            :class="{ 'w-full h-full': isImageExpanded }"
            @dblclick="handleImageDoubleClick"
          >
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style>
.swiper-scrollbar.swiper-scrollbar-horizontal{padding:0px 1px; bottom: 1; height: 7px; background: rgba(255, 255, 255, 0.336)}
.swiper-scrollbar-drag{background: rgb(41, 41, 41);}

.swiper-zoom-container img {
  transition: transform 0.3s ease-in-out;
}

.swiper-zoom-container img:hover {
  transform: scale(1.1);
}
</style>
