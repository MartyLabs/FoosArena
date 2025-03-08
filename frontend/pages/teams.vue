<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold">👥 Toutes les équipes</h1>
    <div
      v-if="teams.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6"
    >
      <NuxtLink v-for="team in teams" :key="team.id" :to="`/team/${team.id}`">
        <div class="bg-gray-200 p-4 rounded shadow hover:bg-gray-300">
          {{ team.name }}
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-gray-500 mt-4">Aucune équipe pour le moment.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const teams = ref([]);

const fetchTeams = async () => {
  try {
    const response = await axios.get("http://localhost:5000/teams");
    teams.value = response.data;
  } catch (error) {
    console.error("Team loading error", error);
  }
};

onMounted(fetchTeams);
</script>
// Update Sat Mar 15 08:29:16 PM CET 2025
