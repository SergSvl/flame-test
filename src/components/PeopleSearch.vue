<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { type ILSData } from '@/lib/utils/helpers/local-storage-helpers'
import { Search } from '@/assets/icons'
import { Spinner } from '@/assets/icons'
import { usePeopleStore } from '@/stores'
import { RoutePath } from '@/router'
import useDebounce from '@/hooks/useDebounce'

const props = defineProps({
  clickOnParent: {
    type: Boolean,
    default: () => false
  }
})

const { debouncedValue, displayValue, debounceListener } = useDebounce()

const peopleStore = usePeopleStore()
peopleStore.fetchPeople()
const people = computed(() => peopleStore.getPeople)
const found = computed(() => peopleStore.getFound)

const listItems = computed<ILSData[]>(() => people.value)
const filteredListItems = ref<ILSData[]>(listItems.value)
const isLoading = ref(false)

const onOpenList = () => (isFocus.value = true)
const onCloseList = () => (isFocus.value = false)
const onAdd = (itemName: string) => {
  console.log('onAdd:', itemName)
}

const isFocus = ref(false)

watch(
  () => props.clickOnParent,
  () => onCloseList()
)
watch(
  () => debouncedValue.value,
  async (curr, prev) => {
    isLoading.value = true
    try {
      await peopleStore.searchPeople(curr)
    } catch (e) {
      console.log('Search error:', e)
    } finally {
      isLoading.value = false
    }
  }
)

watchEffect(() => {
  filteredListItems.value = found.value
})
</script>

<template>
  <div class="md:w-[24rem] relative">
    <div
      class="flex justify-center items-center border-2 rounded-3xl h-[3rem] w-full py-2 px-4 mb-2 overflow-hidden bg-white"
    >
      <input
        class="flex justify-center w-full focus:outline-none focus-visible:border-0 focus:border-0 h-[3rem] m-0 p-0"
        @input="debounceListener"
        :value="displayValue"
        @click.stop="onOpenList"
      />
      <Search v-if="!isLoading" />
      <Spinner class="h-6 w-6 -mr-2" v-else />
    </div>
    <div
      v-if="isFocus && filteredListItems.length"
      class="border-1 rounded-2xl z-2 shadow-lg w-full p-4 absolute overflow-y-auto transition ease-in-out delay-250 min-h-[3rem] max-h-[25rem] bg-white"
    >
      <div
        @click.stop="null"
        class="flex items-center justify-between border-1 hover:bg-blue-50 h-12 leading-2 p-4"
        v-for="item of filteredListItems"
        :key="item.name"
      >
        <RouterLink
          class="hover:underline"
          :to="RoutePath.People + `/${item.url.slice(-2, -1)}`"
          @click.stop="onCloseList"
          >{{ item.name }}</RouterLink
        >
        <div
          class="border cursor-pointer select-none hover:bg-blue-100 px-2 py-1 rounded-md"
          @click.stop="onAdd(item.name)"
        >
          Add
        </div>
      </div>
    </div>
  </div>
</template>
