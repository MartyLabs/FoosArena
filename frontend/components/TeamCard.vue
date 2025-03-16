<template>
  <NuxtLink :to="`/team/${team.id}`" class="team-card">
    <div class="card-content">
      <h2 class="text-xl font-semibold">{{ team.name }}</h2>
      <p class="text-gray-600 text-sm">Tournoi : {{ team.tournamentId }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  team: Object,
});
</script>

<style scoped>
.team-card {
  display: block;
  background: #ff66a3;
  padding: 20px;
  border: 4px solid black;
  box-shadow: 10px 10px 0 black;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: black;
}

.team-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 13px 13px 0 black;
}
</style>
