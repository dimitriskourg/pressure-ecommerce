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
</script>

<template>
  <Card id="ShippingInformation">
    <CardHeader>
      <CardTitle>Shipping Information</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="space-y-4">
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
