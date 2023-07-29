<script setup lang="ts">
import { computed, ref } from 'vue'
import Table from '@/components/shared/TableComponent.vue'
import { usePeopleStore } from '@/stores'
import PeopleSearch from '@/components/PeopleSearch.vue'
import router from '@/router'
import { Spinner } from '@/assets/icons'

const peopleStore = usePeopleStore()
peopleStore.fetchPeople()

const people = computed(() => peopleStore.getPeople)
const favorites = computed(() => peopleStore.getFavorites)
const personId = computed(() => router.currentRoute.value.params.id)
const isFocus = ref(false)
const onClickMain = () => (isFocus.value = !isFocus.value)
</script>

<template>
  <main
    class="container mx-auto mt-10 flex items-center flex-col w-full justify-center"
    @click="onClickMain"
  >
    <div class="justify-center text-3xl mb-10">Peoples</div>
    <PeopleSearch class="mb-8" :clickOnParent="isFocus" />
    <template v-if="personId === undefined">
      <Table v-if="people.length" :people="people" :favorites="favorites" />
      <div v-else role="status">
        <Spinner />
        <span class="sr-only">Loading...</span>
      </div>
    </template>
    <template v-else>
      <Table
        v-if="people.length"
        :people="people"
        :favorites="favorites"
        :personId="personId.toString()"
      />
    </template>
  </main>
</template>
