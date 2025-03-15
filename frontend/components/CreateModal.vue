<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold">Ajouter une équipe</h2>
      <input
        v-model="name"
        type="text"
        placeholder="Nom de l'équipe"
        class="w-full border rounded px-3 py-2 mt-3"
      />

      <button
        @click="createTeam"
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        ✅ Ajouter
      </button>
      <button @click="$emit('close')" class="ml-2 text-gray-500">
        ❌ Annuler
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
  tournamentId: String,
});

const name = ref("");

const createTeam = async () => {
  try {
    await axios.post("http://localhost:5000/teams", {
      name: name.value,
      tournamentId: props.tournamentId,
    });
    window.location.reload();
  } catch (error) {
    console.error("Error adding team", error);
  }
};
</script>
// Update Sat Mar 15 08:29:16 PM CET 2025
