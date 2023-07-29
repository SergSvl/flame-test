<script setup lang="ts">
import { type PropType, ref, computed, watchEffect } from 'vue'
import { type ILSData } from '@/lib/utils/helpers/local-storage-helpers'
import Button from '@/components/shared/Button.vue'
import { usePeopleStore } from '@/stores'

const props = defineProps({
  people: {
    type: Array as PropType<ILSData[]>,
    default: () => []
  },
  favorites: {
    type: Array as PropType<ILSData[]>,
    default: () => []
  },
  personId: {
    type: String,
    default: () => ''
  }
})

const peopleStore = usePeopleStore()
const tableBorderStyle = 'border-2 border-gray-300'
const cellPadding = 'p-5'

const people = computed<ILSData[]>(() => props.people)
const preparedPeople = ref<ILSData[]>(people.value)
const personId = computed<string>(() => props.personId)
watchEffect(() => {
  if (personId.value) {
    const filtered = people.value.filter((item) => {
      return item.url.slice(-2, -1).toString() === personId.value
    })
    preparedPeople.value = [...filtered]
  } else {
    preparedPeople.value = people.value
  }
})

const isFavoritePersone = (person: ILSData) =>
  props.favorites.find((item) => person.name.toString() === item.name.toString()) !== undefined
const getTextButton = (person: ILSData) =>
  isFavoritePersone(person) ? 'Remove favorite' : 'Add favorite'
const getClickHandle = (person: ILSData) =>
  isFavoritePersone(person) ? onRemoveFromFavorite : onAddToFavorite
const onAddToFavorite = (person: ILSData) => peopleStore.setFavorites(person)
const onRemoveFromFavorite = (person: ILSData) => peopleStore.removeFavorite(person)
</script>

<template>
  <table :class="tableBorderStyle">
    <thead>
      <tr :class="tableBorderStyle">
        <th :class="[tableBorderStyle, cellPadding]">Name</th>
        <th :class="[tableBorderStyle, cellPadding]">Height</th>
        <th :class="[tableBorderStyle, cellPadding]">Mass</th>
        <th :class="[tableBorderStyle, cellPadding]">Hair color</th>
        <th
          v-if="!personId || !isFavoritePersone(preparedPeople[0])"
          :class="[tableBorderStyle, cellPadding]"
        >
          Add favorite / Remove favorite
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :class="tableBorderStyle" v-for="person of preparedPeople" :key="person.name">
        <td :class="[tableBorderStyle, cellPadding]">{{ person.name }}</td>
        <td :class="[tableBorderStyle, cellPadding]">{{ person.height }}</td>
        <td :class="[tableBorderStyle, cellPadding]">{{ person.mass }}</td>
        <td :class="[tableBorderStyle, cellPadding]">{{ person.hair_color }}</td>
        <td
          v-if="!personId || !isFavoritePersone(person)"
          class="w-[170px] select-none"
          :class="[tableBorderStyle, cellPadding]"
        >
          <Button
            :text="getTextButton(person)"
            :title="getTextButton(person)"
            :onClick="getClickHandle(person)"
            :person="person"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
