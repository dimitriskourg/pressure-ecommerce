<script setup>
import { AlertCircle, MapPinned } from 'lucide-vue-next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const dialogTitles = {
  addAddress: 'Add New Address',
  editAddress: 'Edit Address',
}

const dialogButtonTitles = {
  addAddress: 'Add',
  editAddress: 'Edit',
}
const dialogOpen = ref(false)
const dialogTitle = ref(dialogTitles.addAddress)
const dialogButton = ref(dialogButtonTitles.addAddress)

const user = useSupabaseUser()
const userName = computed(() => user.value?.user_metadata.full_name ?? user.value?.email.split('@')[0])
// take the first 2 letters
const userNameInitials = computed(() => userName.value.slice(0, 2))
const userEmail = computed(() => user.value?.email)

const errorAlert = ref(false)
const errorMessage = ref('')

const completeAlert = ref(false)

const name = ref('')
const street = ref('')
const city = ref('')
const country = ref('')
const zipcode = ref('')

const addressEdited = ref(null)

const { data: addresses, pending: pendingAddresses, refresh: refreshAddresses } = await useFetch('/api/auth/addresses', {
  headers: useRequestHeaders(['cookie']),
})

function clearFields() {
  name.value = ''
  street.value = ''
  city.value = ''
  country.value = ''
  zipcode.value = ''
}

async function submitAddressChange() {
  if (!name.value || !street.value || !city.value || !country.value || !zipcode.value) {
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
    return
  }

  if (dialogTitle.value === dialogTitles.addAddress)
    await onAddNewAddress()
  else
    await onEditAddress()
}

async function onEditAddress() {
  const editedAddress = {
    name: name.value,
    street: street.value,
    city: city.value,
    country: country.value,
    zipcode: zipcode.value,
    id: addressEdited.value.id,
  }

  const { data: editedAddressMessage, error: editedAddressError } = await useFetch('/api/auth/address', {
    method: 'PUT',
    headers: useRequestHeaders(['cookie']),
    body: { editedAddress },
  })

  if (editedAddressError.value) {
    errorMessage.value = editedAddressError.value.data?.message
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
    return
  }

  // completeAlert.value = true
  // errorMessage.value = editedAddressMessage.value.message

  clearFields()
  await refreshAddresses()
  dialogOpen.value = false

  addressEdited.value = null
  dialogTitle.value = dialogTitles.addAddress
  dialogButton.value = dialogButtonTitles.addAddress
}

async function onAddNewAddress() {
  const newAddress = {
    name: name.value,
    street: street.value,
    city: city.value,
    country: country.value,
    zipcode: zipcode.value,
  }

  const { data: newAddressMessage, error: newAddressError } = await useFetch('/api/auth/address', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']),
    body: { newAddress },
  })

  if (newAddressError.value) {
    errorMessage.value = newAddressError.value.data?.message
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 3000)
    return
  }
  // completeAlert.value = true
  // errorMessage.value = newAddressMessage.value.message

  clearFields()
  await refreshAddresses()

  dialogOpen.value = false
}

function editAddress(address) {
  dialogTitle.value = dialogTitles.editAddress
  dialogButton.value = dialogButtonTitles.editAddress

  name.value = address.name
  street.value = address.street
  city.value = address.city
  country.value = address.country
  zipcode.value = address.zipcode

  addressEdited.value = toRaw(address)

  dialogOpen.value = true
}

async function deleteAddress(address) {
  await useFetch('/api/auth/address', {
    method: 'DELETE',
    headers: useRequestHeaders(['cookie']),
    body: { id: address.id },
  })

  await refreshAddresses()
}
</script>

<template>
  <div id="userAddressesCard">
    <Dialog v-model:open="dialogOpen">
      <Card>
        <CardHeader>
          <CardTitle>Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div v-if="pendingAddresses" class="text-center">
              <CommonLoading />
            </div>
            <div v-for="address in addresses" v-else :key="address.id" class="flex items-center gap-4">
              <MapPinned class="h-8 w-8 sm:h-6 sm:w-6" />
              <div class="grid gap-1">
                <h3 class="font-semibold">
                  {{ address.name }}
                </h3>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ address.street }}, {{ address.city }}, {{ address.country }}, {{ address.zipcode }}
                </div>
              </div>
              <Button class="ml-auto hover:text-white hover:bg-black" size="sm" variant="outline" @click="editAddress(address)">
                Edit
              </Button>
              <Button class="hover:text-white hover:bg-black" size="sm" variant="outline" @click="deleteAddress(address)">
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex items-center gap-2">
          <DialogTrigger as-child>
            <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black">
              Add Address
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent class="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{{ dialogTitle }}</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="street" v-model="street" class="col-span-4" placeholder="Street" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="city" v-model="city" class="col-span-4" placeholder="City" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="country" v-model="country" class="col-span-4" placeholder="Country" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="zipcode" v-model="zipcode" class="col-span-4" placeholder="Zipcode" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Input id="name" v-model="name" class="col-span-4" placeholder="Name of Address" />
          </div>
        </div>
        <DialogFooter class="sm:flex sm:flex-col-reverse">
          <Alert v-if="errorAlert" variant="destructive" class="my-3">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {{ errorMessage }}
            </AlertDescription>
          </Alert>
          <Alert v-if="completeAlert" class="my-3">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Complete</AlertTitle>
            <AlertDescription>
              {{ errorMessage }}
            </AlertDescription>
          </Alert>
          <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black" @click="submitAddressChange">
            {{ dialogButton }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
