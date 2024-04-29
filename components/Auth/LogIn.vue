<script setup>
import { CheckCircle } from 'lucide-vue-next'

const supabase = useSupabaseClient()
const email = ref('')
const emailError = ref(false)
const successLinkCreated = ref(false)
const emailErrorText = ref('')

async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://www.dimitriskourg.gr/auth/confirm',
    },
  })
  if (error)
    console.error(error)
}

async function signInWithMagicLink() {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
  }, {
    redirectTo: 'https://www.dimitriskourg.gr/auth/confirm',
  })
  if (error) {
    emailError.value = true
    emailErrorText.value = error.message
    return
  }
  successLinkCreated.value = true
}

async function checkEmailAndSignIn() {
  console.log(email.value)
  if (!email.value) {
    emailError.value = true
    emailErrorText.value = 'Please enter your email address'
    return
  }
  else {
    emailError.value = false
  }

  await signInWithMagicLink()
}
</script>

<template>
  <div class="flex w-full max-w-lg mx-4 overflow-hidden my-12 lg:my-20 bg-white rounded-lg shadow-lg  lg:max-w-7xl">
    <div class="hidden bg-cover lg:block lg:w-1/2" style="background-image: url('/cbum-crop.jpg');" />

    <div class="w-full px-6 py-8 lg:py-40 md:px-8 lg:w-1/2">
      <p class="mt-3 text-xl text-center text-gray-600">
        Welcome back!
      </p>

      <div href="#" class="flex items-center justify-center mt-12 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 hover:cursor-pointer" @click="signInWithGoogle">
        <div class="px-4 py-2">
          <Icon name="flat-color-icons:google" class="w-6 h-6" />
        </div>

        <span class="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
      </div>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b lg:w-1/4" />

        <div class="text-xs text-center text-gray-500 uppercase">
          or login
          with email
        </div>

        <span class="w-1/5 border-b lg:w-1/4" />
      </div>

      <div class="mt-4">
        <label class="block mb-2 text-sm font-medium text-gray-600" for="LoggingEmailAddress">Email Address</label>
        <input id="LoggingEmailAddress" v-model="email" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:border-gray-800 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-gray-600" type="email" @keyup.enter="checkEmailAndSignIn">
      </div>

      <!-- Error message if email is empty -->
      <div v-if="emailError" class="mt-2 text-sm text-red-600">
        <span>{{ emailErrorText }}</span>
      </div>

      <Alert v-if="successLinkCreated" class="my-4">
        <CheckCircle class="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Please check your email for the magic link!
        </AlertDescription>
      </Alert>

      <div class="mt-6">
        <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" @click="checkEmailAndSignIn">
          Sign In
        </button>
      </div>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b md:w-1/4" />

        <NuxtLink to="/auth/signup" class="text-xs text-gray-500 uppercase hover:underline">
          or sign up
        </NuxtLink>

        <span class="w-1/5 border-b md:w-1/4" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
