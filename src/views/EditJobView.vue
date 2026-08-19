<script setup>
import router from "@/router";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";
import BackButton from "@/components/BackButton.vue";

const route = useRoute();
const jobId = route.params.id;

const form = reactive({
  type: "",
  title: "",
  description: "",
  salary: "",
  location: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const state = reactive({
  job: null,
  isLoading: true,
});

const toast = useToast();

const handleSubmit = async () => {
  const updateJob = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };
  try {
    // Mocking the put request for static deployment
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success("Job Updated Successfully (Mock)", {
      toastClassName: "bg-zinc-900 text-zinc-100 border border-zinc-800",
    });
    router.push(`/jobs/${jobId}`);
  } catch (error) {
    console.error("Error updating job", error);
    toast.error("Job Was Not Updated");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('/jobs.json');
    state.job = response.data.jobs.find(job => job.id === jobId);
    if (!state.job) throw new Error("Job not found in static data");
    
    // Populate inputs safely
    form.type = state.job.type || "";
    form.title = state.job.title || "";
    form.description = state.job.description || "";
    form.salary = state.job.salary || "";
    form.location = state.job.location || "";
    
    // Using optional chaining and fallbacks
    form.company.name = state.job.company?.name || "";
    form.company.description = state.job.company?.description || "";
    form.company.contactEmail = state.job.company?.contactEmail || "";
    form.company.contactPhone = state.job.company?.contactPhone || "";
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
    <section class="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Skeleton loading for form -->
        <div v-if="state.isLoading" class="bg-zinc-900 px-8 py-10 shadow-xl rounded-2xl border border-zinc-800/60 animate-pulse">
          <div class="w-1/3 h-8 bg-zinc-800 rounded mx-auto mb-10"></div>
          <div class="space-y-6">
            <div v-for="i in 5" :key="i" class="space-y-2">
              <div class="w-1/4 h-4 bg-zinc-800 rounded"></div>
              <div class="w-full h-12 bg-zinc-800 rounded-xl"></div>
            </div>
            <div class="w-full h-14 bg-zinc-800 rounded-xl mt-8"></div>
          </div>
        </div>

        <!-- Form content -->
        <div v-else class="bg-zinc-900 px-8 py-10 shadow-xl rounded-2xl border border-zinc-800/60 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-800"></div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="text-center mb-10">
              <h2 class="text-3xl font-extrabold tracking-tight text-zinc-100">Edit Job</h2>
              <p class="mt-2 text-zinc-400">Update the details of your listing.</p>
            </div>

            <!-- Job Info Section -->
            <div class="space-y-5">
              <div>
                <label for="type" class="block text-sm font-semibold text-zinc-300 mb-2">Job Type</label>
                <select v-model="form.type" id="type" required class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner appearance-none">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label for="name" class="block text-sm font-semibold text-zinc-300 mb-2">Job Title</label>
                <input type="text" v-model="form.title" id="name" required class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner" />
              </div>

              <div>
                <label for="description" class="block text-sm font-semibold text-zinc-300 mb-2">Job Description</label>
                <textarea id="description" v-model="form.description" rows="5" class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner resize-none"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label for="salary" class="block text-sm font-semibold text-zinc-300 mb-2">Salary Range</label>
                  <select id="salary" v-model="form.salary" required class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner appearance-none">
                    <option value="Under $50K">Under $50K</option>
                    <option value="$50K - $60K">$50K - $60K</option>
                    <option value="$60K - $70K">$60K - $70K</option>
                    <option value="$70K - $80K">$70K - $80K</option>
                    <option value="$80K - $90K">$80K - $90K</option>
                    <option value="$90K - $100K">$90K - $100K</option>
                    <option value="$100K - $125K">$100K - $125K</option>
                    <option value="$125K - $150K">$125K - $150K</option>
                    <option value="$150K - $175K">$150K - $175K</option>
                    <option value="$175K - $200K">$175K - $200K</option>
                    <option value="Over $200K">Over $200K</option>
                  </select>
                </div>

                <div>
                  <label for="location" class="block text-sm font-semibold text-zinc-300 mb-2">Location</label>
                  <input type="text" v-model="form.location" id="location" required class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner" />
                </div>
              </div>
            </div>

            <hr class="border-zinc-800 my-8" />

            <!-- Company Info Section -->
            <div class="space-y-5">
              <h3 class="text-xl font-bold text-zinc-100">Company Details</h3>
              
              <div>
                <label for="company" class="block text-sm font-semibold text-zinc-300 mb-2">Company Name</label>
                <input type="text" v-model="form.company.name" id="company" class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner" />
              </div>

              <div>
                <label for="company_description" class="block text-sm font-semibold text-zinc-300 mb-2">Company Description</label>
                <textarea id="company_description" v-model="form.company.description" rows="3" class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner resize-none"></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label for="contact_email" class="block text-sm font-semibold text-zinc-300 mb-2">Contact Email</label>
                  <input type="email" v-model="form.company.contactEmail" id="contact_email" required class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner" />
                </div>
                
                <div>
                  <label for="contact_phone" class="block text-sm font-semibold text-zinc-300 mb-2">Contact Phone</label>
                  <input type="tel" v-model="form.company.contactPhone" id="contact_phone" class="block w-full rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors shadow-inner" />
                </div>
              </div>
            </div>

            <div class="pt-6">
              <button type="submit" class="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-zinc-900 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-emerald-500 transition-all duration-200 active:scale-[0.98]">
                Update Job Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
