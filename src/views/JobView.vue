<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import axios from "axios";
import BackButton from "@/components/BackButton.vue";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;

const state = reactive({
  job: null,
  isLoading: true,
});

const deleteJob = async () => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      // Mocking the delete request for static deployment
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Job Deleted Successfully (Mock)");
      router.push("/jobs");
    }
  } catch (error) {
    console.error("Error deleting job", error);
    toast.error("Failed to delete job");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('/jobs.json');
    state.job = response.data.jobs.find(job => job.id === jobId);
    if (!state.job) throw new Error("Job not found in static data");
  } catch (error) {
    console.error("Error fetching job", error);
    router.push('/404');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="bg-zinc-950 flex-grow flex flex-col">
    <BackButton />

    <!-- Skeleton Loading -->
    <section v-if="state.isLoading" class="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-70-30 gap-8 animate-pulse">
        <main class="space-y-6">
          <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50">
            <div class="w-24 h-6 bg-zinc-800 rounded-full mb-4"></div>
            <div class="w-3/4 h-10 bg-zinc-800 rounded mb-6"></div>
            <div class="w-1/3 h-5 bg-zinc-800 rounded"></div>
          </div>
          <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50">
            <div class="w-1/4 h-6 bg-zinc-800 rounded mb-4"></div>
            <div class="space-y-3 mb-8">
              <div class="h-4 bg-zinc-800 rounded w-full"></div>
              <div class="h-4 bg-zinc-800 rounded w-full"></div>
              <div class="h-4 bg-zinc-800 rounded w-5/6"></div>
            </div>
            <div class="w-1/4 h-6 bg-zinc-800 rounded mb-4"></div>
            <div class="w-1/3 h-5 bg-zinc-800 rounded"></div>
          </div>
        </main>
        <aside class="space-y-6">
          <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50">
            <div class="w-1/2 h-6 bg-zinc-800 rounded mb-6"></div>
            <div class="w-3/4 h-8 bg-zinc-800 rounded mb-4"></div>
            <div class="space-y-3 mb-6">
              <div class="h-4 bg-zinc-800 rounded w-full"></div>
              <div class="h-4 bg-zinc-800 rounded w-4/6"></div>
            </div>
            <hr class="border-zinc-800 my-6" />
            <div class="space-y-4">
              <div class="w-1/3 h-5 bg-zinc-800 rounded"></div>
              <div class="w-full h-10 bg-zinc-800 rounded"></div>
              <div class="w-1/3 h-5 bg-zinc-800 rounded"></div>
              <div class="w-full h-10 bg-zinc-800 rounded"></div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- Content -->
    <section v-else-if="state.job" class="flex-grow py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <main>
            <!-- Job Header -->
            <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50 relative overflow-hidden group">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="relative z-10">
                <div class="inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-emerald-400 border border-zinc-700 mb-6">
                  {{ state.job.type }}
                </div>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-zinc-100 mb-4 tracking-tight">{{ state.job.title }}</h1>
                <div class="flex items-center text-zinc-400 font-medium">
                  <i class="pi pi-map-marker text-emerald-500 mr-2"></i>
                  <span>{{ state.job.location }}</span>
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50 mt-6">
              <h3 class="text-xl font-bold text-zinc-100 mb-4 flex items-center">
                <i class="pi pi-align-left mr-3 text-emerald-500"></i>
                Job Description
              </h3>
              <div class="prose prose-invert prose-zinc max-w-none text-zinc-300 mb-8 whitespace-pre-wrap leading-relaxed">
                {{ state.job.description }}
              </div>
              
              <h3 class="text-xl font-bold text-zinc-100 mb-4 flex items-center">
                <i class="pi pi-money-bill mr-3 text-emerald-500"></i>
                Compensation
              </h3>
              <p class="text-zinc-300 font-medium bg-zinc-800/50 inline-block px-4 py-2 rounded-lg border border-zinc-700">
                {{ state.job.salary }} <span class="text-zinc-500 text-sm ml-1 font-normal">/ Year</span>
              </p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside class="space-y-6">
            <!-- Company Info -->
            <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50">
              <h3 class="text-sm font-bold tracking-wider text-zinc-500 uppercase mb-4">About the Company</h3>
              <h2 class="text-2xl font-bold text-zinc-100 mb-3">{{ state.job.company?.name || 'Unknown Company' }}</h2>
              <p class="text-zinc-400 text-sm leading-relaxed mb-6">
                {{ state.job.company?.description || 'No description provided.' }}
              </p>
              
              <hr class="border-zinc-800 my-6" />
              
              <h3 class="text-sm font-bold tracking-wider text-zinc-500 uppercase mb-2">Contact Email</h3>
              <div class="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-200 text-sm mb-5 break-all select-all">
                {{ state.job.company?.contactEmail || 'N/A' }}
              </div>
              
              <h3 class="text-sm font-bold tracking-wider text-zinc-500 uppercase mb-2">Contact Phone</h3>
              <div class="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-200 text-sm">
                {{ state.job.company?.contactPhone || 'N/A' }}
              </div>
            </div>

            <!-- Manage -->
            <div class="bg-zinc-900 p-8 rounded-2xl shadow-lg border border-zinc-800/50">
              <h3 class="text-sm font-bold tracking-wider text-zinc-500 uppercase mb-4">Manage Listing</h3>
              <RouterLink
                :to="`/jobs/edit/${state.job.id}`"
                class="flex items-center justify-center bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-3 px-4 rounded-xl w-full transition-all duration-200 active:scale-95 mb-3"
              >
                <i class="pi pi-pencil mr-2"></i> Edit Job
              </RouterLink>
              <button
                @click="deleteJob"
                class="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 font-bold py-3 px-4 rounded-xl w-full transition-all duration-200 active:scale-95 border border-red-500/20"
              >
                <i class="pi pi-trash mr-2"></i> Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
