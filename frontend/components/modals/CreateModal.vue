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
        @click="handleCreateTeam"
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
import { createTeam } from "@/services/teamService";

const props = defineProps({
  tournamentId: String,
});

const emit = defineEmits(["close"]);
const name = ref("");

/**
 * Handle team creation.
 */
const handleCreateTeam = async () => {
  if (!name.value.trim()) return;

  try {
    await createTeam(props.tournamentId, name.value);
    emit("close");
    window.location.reload();
  } catch (error) {
    console.error("Error adding team", error);
  }
};
</script>
