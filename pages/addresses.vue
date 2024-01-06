<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref('')
const error = ref('')
const addresses = ref([])

async function singIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test12@gmail.com',
    password: 'test12',
  })
  console.log(data)
  if (error)
    error.value = error.message
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error)
    console.log(error)
}

async function getAddresses() {
  const { data: add, pending: pend, error } = await useFetch('/api/addresses')
  // make watch pending
  watch(pend, (val) => {
    loading.value = val
  })

  console.log(add.value)
  addresses.value = add.value
}
</script>

<template>
  <MainLayout>
    <div id="Addresses" class="flex flex-col gap-2">
      Test
      <button class="rounded-none py-2 px-5 bg-zinc-900 text-white mx-2" @click="singIn">
        Sign In
      </button>
      <button class="rounded-none py-2 px-5 bg-zinc-900 text-white mx-2" @click="signOut">
        Sign Out
      </button>
      <button class="rounded-none py-2 px-5 bg-zinc-900 text-white mx-2" @click="getAddresses">
        Get Addresses
      </button>
      <div>
        USER:
        <div v-if="!user">
          Not signed in
        </div>
        <div v-else>
          <div>User: {{ user.email }}</div>
          All Addresses:
          <div v-if="loading">
            Loading...
          </div>
          <div v-else>
            <div v-for="(address, index) in addresses" :key="index">
              {{ address.street }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
