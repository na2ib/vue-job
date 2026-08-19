<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}
</script>

<template>
  <nav class="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex shrink-0 items-center mr-6 group" to="/">
            <img class="h-8 w-auto group-hover:scale-105 transition-transform duration-300" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-zinc-100 text-xl font-bold tracking-tight ml-3 group-hover:text-emerald-400 transition-colors duration-300">
              Vue Jobs
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-1">
              <RouterLink
                to="/"
                :class="[isActiveLink('/') ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100','px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200']"
              >Home</RouterLink>
              <RouterLink
                to="/jobs"
                :class="[isActiveLink('/jobs') ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100','px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200']"
              >Jobs</RouterLink>
              <RouterLink
                to="/jobs/add"
                :class="[isActiveLink('/jobs/add') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100 border border-transparent','px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ml-2']"
              >Post a Job</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
