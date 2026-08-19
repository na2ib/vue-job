<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps({
    job: {
      type: Object,
      required: true
    }
});

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
}

const truncatedDescription = computed(() =>{
  let description = props.job.description;
  if(!showFullDescription.value){
    description  = description.substring(0, 90) + '...';
  }
  return description;
})
</script>

<template>
  <div class="bg-zinc-900 rounded-2xl shadow-sm border border-zinc-800/60 p-6 relative overflow-hidden group hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col h-full">
    <div class="mb-5 flex-grow">
      <div class="flex items-center gap-x-3 mb-3">
        <span class="inline-flex items-center rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-zinc-700/50">
          {{ job.type }}
        </span>
      </div>
      <h3 class="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">{{ job.title }}</h3>
      
      <div class="mt-4 text-zinc-400 text-sm leading-relaxed">
        {{ truncatedDescription }}
      </div>
      <button @click="toggleFullDescription" class="text-emerald-500 hover:text-emerald-400 text-sm font-medium mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded px-1 -ml-1 transition-colors">
        {{ showFullDescription ? 'Show Less' : 'Read More' }}
      </button>
    </div>

    <div class="mt-auto">
      <div class="flex items-center text-zinc-300 font-medium mb-5">
        <i class="pi pi-money-bill text-emerald-500 mr-2"></i>
        {{ job.salary }} / Year
      </div>
      
      <div class="border-t border-zinc-800/60 pt-5 mt-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <div class="text-zinc-400 text-sm flex items-center w-full lg:w-auto">
          <i class="pi pi-map-marker text-emerald-500 mr-2"></i>
          <span class="truncate">{{ job.location }}</span>
        </div>
        <RouterLink
          :to="'/jobs/' + job.id"
          class="w-full lg:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-5 py-2.5 rounded-lg text-center text-sm font-semibold transition-all duration-200 active:scale-95 border border-zinc-700 hover:border-zinc-600"
        >
          Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
