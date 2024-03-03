<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const name = defineModel('name', { required: true })
const email = defineModel('email', { required: true })
const street = defineModel('street', { required: true })
const city = defineModel('city', { required: true })
const country = defineModel('country', { required: true })
const zipcode = defineModel('zipcode', { required: true })
const selectedAddress = ref(null)

const user = useSupabaseUser()

const { data: addresses, pending } = await useFetch('/api/auth/addresses', {
  headers: useRequestHeaders(['cookie']),
})

const userName = computed(() => user.value?.user_metadata.full_name)

watch(selectedAddress, (newVal) => {
  if (!newVal)
    return
  const selected = addresses.value.find(address => address.id.toString() === newVal)

  if (selected) {
    street.value = selected.street
    city.value = selected.city
    country.value = selected.country
    zipcode.value = selected.zipcode
  }
})

name.value = userName.value ?? ''
email.value = user.value?.email ?? ''
</script>

<template>
  <Card id="ShippingInformation">
    <CardHeader>
      <CardTitle>Shipping Information</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="space-y-4">
        <div v-if="user && addresses" class="space-y-2">
          <Label>Select one of your Addresses:</Label>
          <CheckoutComponentsSignedUserAddresses v-model="selectedAddress" :addresses="addresses" />
        </div>
        <div class="space-y-2">
          <Label html-for="name">Name</Label>
          <Input id="name" v-model="name" placeholder="Enter your name" />
        </div>
        <div class="space-y-2">
          <Label html-for="email">Email</Label>
          <Input id="email" v-model="email" placeholder="Enter your email" />
        </div>
        <div class="space-y-2">
          <Label html-for="street">Street</Label>
          <Input id="street" v-model="street" placeholder="Enter your Street" />
        </div>
        <div class="space-y-2">
          <Label html-for="city">City</Label>
          <Input id="city" v-model="city" placeholder="Enter your City" />
        </div>
        <div class="space-y-2">
          <Label html-for="country">Country</Label>
          <Input id="country" v-model="country" placeholder="Enter your Country" />
        </div>
        <div class="space-y-2">
          <Label html-for="zipcode">Zipcode</Label>
          <Input id="zipcode" v-model="zipcode" placeholder="Enter your Zipcode" />
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>

</style>
