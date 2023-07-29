<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RoutePath } from './router'
</script>

<template>
  <header class="border-b border-gray-300 flex mx-auto">
    <div class="container mx-auto flex align-center h-full">
      <nav class="flex items-center flex-wrap mx-auto h-full justify-evenly text-lg font-semibold">
        <RouterLink
          class="active:font-bold hover:font-bold h-full w-[200px] inline-block text-center p-4 mx-1 hover:bg-blue-100 hover:border-blue-400"
          :to="RoutePath.Main"
          >Home</RouterLink
        >
        <RouterLink
          class="active:font-bold hover:font-bold h-full w-[200px] inline-block text-center p-4 mx-1 hover:bg-blue-100 hover:border-blue-400"
          :to="RoutePath.People"
          >Peoples</RouterLink
        >
        <RouterLink
          class="active:font-bold hover:font-bold h-full w-[200px] inline-block text-center p-4 mx-1 hover:bg-blue-100 hover:border-blue-400"
          :to="RoutePath.Favorites"
          >Favorites</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
