<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="bg-zinc-950 border-b border-zinc-800/50">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <RouterLink
        to="/jobs"
        class="inline-flex items-center text-zinc-400 hover:text-emerald-400 font-medium transition-colors duration-200 group"
      >
        <i class="pi pi-arrow-left mr-2 group-hover:-translate-x-1 transition-transform duration-200"></i>
        Back to Jobs
      </RouterLink>
    </div>
  </section>
</template>
