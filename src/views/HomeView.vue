<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
</script>

<template>
  <div class="flex-grow flex flex-col">
    <Hero />
    <HomeCards />
    <JobListings :limit="3" :showButton="true" />
  </div>
</template>
