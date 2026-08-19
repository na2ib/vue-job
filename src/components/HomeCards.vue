<script setup>
import { RouterLink } from 'vue-router';
import Card from '@/components/Card.vue';
</script>

<template>
    <section class="py-16 bg-zinc-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card bg="bg-zinc-900">
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold text-zinc-100">For Developers</h2>
              <p class="mt-3 mb-6 text-zinc-400">
                Browse our Vue jobs and start your career today.
              </p>
              <RouterLink
                to="/jobs"
                class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white transition-all duration-200 active:scale-95 border border-zinc-700"
              >
                Browse Jobs
              </RouterLink>
            </div>
          </Card>
          
          <Card bg="bg-zinc-900 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold text-emerald-400">For Employers</h2>
              <p class="mt-3 mb-6 text-zinc-400">
                List your job to find the perfect developer for the role.
              </p>
              <RouterLink
                to="/jobs/add"
                class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all duration-200 active:scale-95 shadow-md shadow-emerald-500/20"
              >
                Post a Job
              </RouterLink>
            </div>
          </Card>
        </div>
      </div>
    </section>
</template>
