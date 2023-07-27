<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { RoutePath } from './router'
</script>

<template>
  <header>
    <div class="container mx-auto my-10 h-20 flex">
      <nav class="flex items-center mx-auto justify-evenly text-lg font-semibold">
        <RouterLink
          class="active:font-bold hover:font-bold w-[200px] text-center p-2 mx-1 rounded-lg border border-gray-400 hover:bg-green-200 hover:border-green-400"
          :to="RoutePath.Main"
          >Home</RouterLink
        >
        <RouterLink
          class="active:font-bold hover:font-bold w-[200px] text-center p-2 mx-1 rounded-lg border border-gray-400 hover:bg-green-200 hover:border-green-400"
          :to="RoutePath.Peoples"
          >Peoples</RouterLink
        >
        <RouterLink
          class="active:font-bold hover:font-bold w-[200px] text-center p-2 mx-1 rounded-lg border border-gray-400 hover:bg-green-200 hover:border-green-400"
          :to="RoutePath.Favorites"
          >Favorites</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
