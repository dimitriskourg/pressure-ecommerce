<script setup>
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps(['addresses'])
const model = defineModel()

const { addresses } = toRefs(props)
</script>

<template>
  <div id="SignedUserAddresses" class="">
    <Select v-model="model">
      <SelectTrigger class="">
        <SelectValue placeholder="Select an address" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Addresses</SelectLabel>
          <SelectItem v-for="address in addresses" :key="address.id.toString()" :value="address.id.toString()">
            {{ address.name }}: {{ address.street }}, {{ address.city }}, {{ address.country }}, {{ address.zipcode }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<style lang="scss" scoped>

</style>
