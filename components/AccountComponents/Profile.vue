<script setup>
import { AlertCircle } from 'lucide-vue-next'
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
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const userName = computed(() => user.value?.user_metadata.full_name ?? user.value?.email.split('@')[0])
// take the first 2 letters
const userNameInitials = computed(() => user.value?.email.split('@')[0].slice(0, 2))
const userEmail = computed(() => user.value?.email)
const userAvatar = computed(() => user.value?.user_metadata.picture ?? '')

const name = ref('')
const errorAlert = ref(false)

const dialogOpen = ref(false)

async function onSaveChanges() {
  if (name.value === user.value?.user_metadata.full_name)
    return
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name.value,
    },
  })
  if (error) {
    errorAlert.value = true
    return
  }
  dialogOpen.value = false
}
</script>

<template>
  <div id="userProfileCard">
    <Dialog v-model:open="dialogOpen">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4">
            <Avatar class-name="h-16 w-16">
              <AvatarImage alt="userImage" :src="userAvatar" />
              <AvatarFallback>{{ userNameInitials }}</AvatarFallback>
            </Avatar>
            <div class="grid gap-1">
              <h3 class="font-semibold">
                {{ userName }}
              </h3>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ userEmail }}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter class-name="flex items-center gap-2">
          <DialogTrigger as-child>
            <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black">
              Edit Profile
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent class="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Name
            </Label>
            <Input id="name" v-model="name" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" class="bg-black text-white hover:bg-white hover:text-black" @click="onSaveChanges">
            Save changes
          </Button>
          <Alert v-if="errorAlert" variant="destructive" class="my-3">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again later.
            </AlertDescription>
          </Alert>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
