import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      isLoading: false,
      cart: [],
      checkout: [],
    }),
    actions: {
      // add an item to the cart
      addToCart(product, selectedSize, uuid, selectedQuantity = 1) {
        // check if this product with this color is already in the cart
        const isAlreadyInCart = this.cart.find(item => item.id === product.id && item.selectedSize === selectedSize)
        if (isAlreadyInCart) {
          // if it is, just increment the quantity
          isAlreadyInCart.selectedQuantity += selectedQuantity
          return
        }
        // otherwise, add a new item
        this.cart.push({ ...product, selectedSize, uuid, selectedQuantity })
      },
      changeCartQuantity(productUUID, selectedQuantity) {
        const index = this.cart.findIndex(item => item.uuid === productUUID)
        if (index !== -1)
          this.cart[index].selectedQuantity = selectedQuantity
      },
      // remove item from cart
      removeFromCart(productUUID) {
        const index = this.cart.findIndex(item => item.uuid === productUUID)
        this.cart.splice(index, 1)
      },
      // clear cart
      clearCart() {
        this.cart = []
      },
      // add an item to the checkout
      addToCheckout(product) {
        // calculate total price (after discount)
        product.totalPrice = ((product.price - (product.price * product.discount / 100)) * product.selectedQuantity) / 100
        this.checkout.push(product)
      },
      // remove item from checkout
      removeFromCheckout(productUUID) {
        const index = this.checkout.findIndex(item => item.uuid === productUUID)
        this.checkout.splice(index, 1)
      },
      // clear checkout
      clearCheckout() {
        this.checkout = []
      },

    },
    persist: true,
  },
)
