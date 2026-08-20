<script setup>
import { RouterLink } from 'vue-router';
import { reactive, onMounted } from 'vue';
import JobListing from './JobListing.vue';
import axios from 'axios';

defineProps({
    limit: {
      type: Number,
      default: Infinity
    },
    showButton: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    jobs: [],
    isLoading: true    
});

onMounted(async () => {
    try {
        const response = await axios.get(`${import.meta.env.BASE_URL}jobs.json`);
        state.jobs = response.data.jobs;
    } catch(error) {
        console.error('Error fetching jobs', error);
    } finally {
        // Adding a slight artificial delay just to show off the skeleton loading state
        setTimeout(() => {
          state.isLoading = false;
        }, 500);
    }
});
</script>

<template>
  <section class="bg-zinc-950 px-4 py-16">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-zinc-100 mb-10 text-center tracking-tight">
        Recent <span class="text-emerald-400">Opportunities</span>
      </h2>

      <!-- Skeleton Loading -->
      <div v-if="state.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in (limit === Infinity ? 6 : limit)" :key="i" class="bg-zinc-900 rounded-2xl border border-zinc-800/60 p-6 flex flex-col h-[340px] animate-pulse">
          <div class="w-20 h-6 bg-zinc-800 rounded-full mb-4"></div>
          <div class="w-3/4 h-7 bg-zinc-800 rounded mb-4"></div>
          <div class="space-y-3 mb-6">
            <div class="h-4 bg-zinc-800 rounded w-full"></div>
            <div class="h-4 bg-zinc-800 rounded w-5/6"></div>
            <div class="h-4 bg-zinc-800 rounded w-4/6"></div>
          </div>
          <div class="mt-auto">
            <div class="w-1/3 h-5 bg-zinc-800 rounded mb-5"></div>
            <div class="border-t border-zinc-800/60 pt-5 flex justify-between">
              <div class="w-1/3 h-5 bg-zinc-800 rounded"></div>
              <div class="w-24 h-10 bg-zinc-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Grid -->
      <TransitionGroup v-else name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, limit)" :key="job.id" :job="job" />
      </TransitionGroup>

      <!-- View All Button -->
      <div v-if="showButton && !state.isLoading" class="mt-14 text-center">
        <RouterLink
          to="/jobs"
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-all duration-200 active:scale-95 border border-zinc-700 hover:border-zinc-600 shadow-sm"
        >
          View All Jobs
          <i class="pi pi-arrow-right ml-2 text-xs"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
