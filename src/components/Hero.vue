<script setup>


defineProps({
    title: {
        type: String,
        default: 'Become a Vue Dev'
    },
    subtitle: {
        type: String,
        default: 'Find the Vue job that fits your skills and needs'
    }
});
</script>

<template>
    <section class="relative bg-zinc-950 py-24 sm:py-32 overflow-hidden border-b border-zinc-800/50">
      <!-- Glow effect -->
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-500 to-emerald-800 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {{ title }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </section>
</template>
