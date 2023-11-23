<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Scrollbar, Zoom } from 'swiper/modules'
import MainLayout from '~/layouts/MainLayout.vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import 'swiper/css/zoom'

const { id } = useRoute().params
const modules = [Navigation, Scrollbar, Zoom]

const { data: product } = await useFetch('/api/product')

const isImageExpanded = ref(false)
const currentImageIndex = ref(0)

function handleCurrentImageIndexChange(swiper) {
  currentImageIndex.value = swiper.activeIndex
}

function handleIsImageExpanded() {
  isImageExpanded.value = !isImageExpanded.value
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

          <ProductPageComponentsSizeSelection :available-sizes="product.sizes" />

          <div class="my-10">
            <!-- Button for  add to cart -->
            <div>
              <button
                class="bg-black text-white px-20 py-2 my-3 rounded-3xl font-medium uppercase flex items-center justify-center hover:bg-gray-600 transition duration-200"
                @click="handleAddToCart(product)"
              >
                <Icon name="ion:bag-sharp" size="18" />
                <span class="ml-2">Add to cart</span>
              </button>
            </div>

            <!-- Button for  add to wishlist -->
            <div>
              <button
                class="bg-slate-400 text-white px-16 py-2 my-2 rounded-3xl font-medium uppercase flex items-center justify-center hover:bg-slate-500 transition duration-200"
                @click="handleAddToWishList(product)"
              >
                <Icon name="mingcute:heart-line" size="18" />
                <span class="ml-2">Add to wishlist</span>
              </button>
            </div>
          </div>
          <ProductPageComponentsProductDescription :description="product.description" title="Description" border-class="border-y-2" />

          <ProductPageComponentsProductDescription :description="product.sizeGuide" title="Fit" class="mt-1" border-class="border-b-2" />
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
