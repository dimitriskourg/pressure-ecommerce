<script setup>
import { CheckCircle } from 'lucide-vue-next'
import MainLayout from '~/layouts/MainLayout.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'

const email = ref('')
const name = ref('')
const message = ref('')
const subject = ref('')
const emailError = ref(false)
const successEmailSent = ref(false)
const emailErrorText = ref('')
const loading = ref(false)

function onBeforeSubmit() {
  if (!email.value || !name.value || !message.value || !subject.value) {
    emailError.value = true
    emailErrorText.value = 'Please fill in all fields'
    return false
  }
  else {
    emailError.value = false
    return true
  }
}

async function sendEmail() {
  const canSubmit = onBeforeSubmit()
  if (!canSubmit)
    return
  loading.value = true
  const { error } = await useFetch('/api/public/contact-us', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: email.value,
      name: name.value,
      message: message.value,
      subject: subject.value,
    },
  })
  loading.value = false
  if (error.value) {
    emailError.value = true
    emailErrorText.value = 'An error occurred. Please try again later.'
    return
  }
  successEmailSent.value = true
}
</script>

<template class="">
  <MainLayout>
    <div id="ContactPage" class="flex flex-col gap-2 min-h-[60vh] justify-center items-center mx-4">
      <div class="flex w-full max-w-2xl overflow-hidden my-12 lg:my-20 bg-white rounded-lg shadow-xl lg:max-w-7xl">
        <div class="hidden bg-cover bg-center lg:block lg:w-1/2" style="background-image: url('/gymgirl1.webp');" />

        <div class="w-full px-6 py-8 lg:py-40 md:px-8 lg:w-1/2">
          <p class="mt-3 text-xl text-center text-gray-600">
            Contact us
          </p>

          <div class="flex flex-col items-center justify-between">
            <div class="grid w-full max-w-lg items-center gap-1.5 mt-4">
              <Label for="name">Name</Label>
              <Input id="name" v-model="name" type="text" placeholder="Name" />
            </div>

            <div class="grid w-full max-w-lg items-center gap-1.5 my-4">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="Email" />
            </div>

            <div class="grid w-full max-w-lg items-center gap-1.5 mb-4">
              <Label for="subject">Subject</Label>
              <Input id="subject" v-model="subject" type="subject" placeholder="Subject" />
            </div>

            <div class="grid w-full max-w-lg items-center gap-1.5 mb-4">
              <Label for="message">Message</Label>
              <Textarea v-model="message" placeholder="Type your message here." />
            </div>

            <!-- Error message if email is empty -->
            <div v-if="emailError" class="mt-2 text-sm text-red-600">
              <span>{{ emailErrorText }}</span>
            </div>

            <Alert v-if="successEmailSent" class="my-4">
              <CheckCircle class="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Thank you for your message! We will get back to you as soon as possible.
              </AlertDescription>
            </Alert>

            <div class="mt-6">
              <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded-sm hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" @click="sendEmail">
                <Icon v-if="loading" name="eos-icons:loading" size="25" class="" />
                <span v-else>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>

</style>
