<script setup lang="ts">
import { type PropType } from 'vue'
import { type ILSData } from '@/lib/utils/helpers/local-storage-helpers'

const props = defineProps({
  text: {
    type: String,
    default: () => 'Add favorite'
  },
  person: {
    type: Object as PropType<ILSData>,
    default: () => {}
  },
  onClick: {
    type: Function,
    default: (prop: ILSData) => prop
  }
})
</script>

<template>
  <button class="w-full text-lime-600 font-normal hover:font-bold" @click="props.onClick(person)">
    {{ props.text }}
  </button>
</template>
