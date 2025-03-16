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
import MatchCard from "~/components/match/MatchCard.vue";
import { fetchMatches, updateMatchScore } from "@/services/matchService";

const route = useRoute();
const tournamentId = ref(route.params.id);
const matches = ref([]);

/**
 * Load matches for the tournament.
 */
const loadMatches = async () => {
  try {
    matches.value = await fetchMatches(tournamentId.value);
  } catch (error) {
    console.error("Error loading matches");
  }
};

/**
 * Update match score and refresh matches.
 * @param {string} matchId - The match ID.
 * @param {number} score1 - Score for team 1.
 * @param {number} score2 - Score for team 2.
 */
const updateScore = async (matchId, score1, score2) => {
  try {
    await updateMatchScore(matchId, score1, score2);
    await loadMatches();
  } catch (error) {
    console.error("Error updating match score");
  }
};

onMounted(loadMatches);
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
