<template>
  <div class="container">
    <NuxtLink :to="`/tournament/${tournamentId}`" class="back-link">
      ⬅ Retour au tournoi
    </NuxtLink>

    <h1 class="page-title">⚔️ Matchs du tournoi</h1>

    <div class="match-scroll-container">
      <div class="match-grid">
        <MatchCard
          v-for="match in matches"
          :key="match.id"
          :match="match"
          @update-score="updateScore"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MatchCard from "~/components/MatchCard.vue";

const route = useRoute();
const tournamentId = ref(route.params.id);
const matches = ref([]);

// Match retrieval
const fetchMatches = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/matches/${tournamentId.value}`
    );
    matches.value = response.data.matches;
  } catch (error) {
    console.error("Erreur lors du chargement des matchs", error);
  }
};

// Updating a score
const updateScore = async (matchId, score1, score2) => {
  try {
    await axios.post(`http://localhost:5000/matches/update-score/${matchId}`, {
      score1,
      score2,
    });
    fetchMatches();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score", error);
  }
};

onMounted(fetchMatches);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.back-link {
  font-size: 16px;
  font-weight: 700;
  color: black;
  text-decoration: none;
  display: inline-block;
  border: 3px solid black;
  padding: 8px 12px;
  background: yellow;
  box-shadow: 5px 5px 0 black;
  transition: 0.2s;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 7px 7px 0 black;
}

.page-title {
  font-size: 28px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  margin: 20px 0;
  background: #ff66a3;
  padding: 12px;
  border: 4px solid black;
  box-shadow: 8px 8px 0 black;
}

.match-scroll-container {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 10px;
  border: 3px solid black;
  box-shadow: 6px 6px 0 black;
  background: white;
}

.match-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  padding: 10px;
}

.match-card {
  background: white;
  padding: 20px;
  border: 4px solid black;
  box-shadow: 8px 8px 0 black;
  text-align: center;
  transition: 0.2s;
}

.match-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 black;
}

.match-card:active {
  transform: translate(4px, 4px);
  box-shadow: 0 0 0 black;
}
</style>
// Update Sat Mar 15 08:29:16 PM CET 2025
