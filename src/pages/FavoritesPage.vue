<script setup lang="ts">
import { computed } from 'vue'
import Table from '@/components/shared/TableComponent.vue'
import { usePeopleStore } from '@/stores'

const peopleStore = usePeopleStore()
const favorites = computed(() => peopleStore.getFavorites)
</script>

<template>
  <main class="container mx-auto mt-10 -h-40 flex items-center flex-col w-full justify-center">
    <div class="justify-center text-3xl mb-10">Favorites</div>
    <Table :people="favorites" :favorites="favorites" />
  </main>
</template>
