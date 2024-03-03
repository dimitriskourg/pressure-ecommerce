<script setup>
import { PackageSearch } from 'lucide-vue-next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const user = useSupabaseUser()

const userName = computed(() => user.value?.user_metadata.full_name ?? user.value?.email.split('@')[0])
// take the first 2 letters
const userNameInitials = computed(() => userName.value.slice(0, 2))
const userEmail = computed(() => user.value?.email)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="flex items-center gap-4">
          <PackageSearch class="h-6 w-6" />
          <div class="grid gap-1">
            <h3 class="font-semibold">
              #12345
            </h3>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Placed on June 23, 2022
            </div>
          </div>
          <div class="text-lg font-bold ml-auto">
            $99.99
          </div>
        </div>
        <div class="flex items-center gap-4">
          <PackageSearch class="h-6 w-6" />
          <div class="grid gap-1">
            <h3 class="font-semibold">
              #12346
            </h3>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Placed on June 22, 2022
            </div>
          </div>
          <div class="text-lg font-bold ml-auto">
            $49.99
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex items-center gap-2">
      <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black">
        View All Orders
      </Button>
    </CardFooter>
  </Card>
</template>

<style lang="scss" scoped>

</style>
