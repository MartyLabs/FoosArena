<template>
  <div
    class="glassmorphism-card p-6 rounded-lg shadow-lg hover:scale-105 transition-all"
  >
    <h2 class="text-xl font-semibold">{{ tournament.name }}</h2>
    <p class="text-gray-400">{{ tournament.description }}</p>
    <p class="mt-2 text-sm text-gray-500">
      📅 {{ new Date(tournament.date).toLocaleDateString() }}
    </p>

    <NuxtLink
      :to="`/tournament/${tournament.id}`"
      class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
    >
      Voir le tournoi
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  tournament: Object,
});
</script>

<style scoped>
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
