<template>
  <div class="container">
    <NuxtLink
      :to="`/tournament/${team.tournamentId}`"
      class="neo-btn neo-yellow"
      >⬅ Retour aux équipes</NuxtLink
    >

    <div class="team-card">
      <h1 class="title">👥 {{ team.name }}</h1>
    </div>

    <div class="edit-section">
      <label class="section-title">Modifier le nom de l'équipe :</label>
      <div class="input-group">
        <input v-model="newName" type="text" class="neo-input" />
        <button @click="handleUpdateTeamName" class="neo-btn neo-green">
          ✅ Sauvegarder
        </button>
        <div class="delete-section">
          <button @click="confirmDelete" class="neo-btn neo-red">
            ❌ Supprimer l'équipe
          </button>
        </div>
      </div>
    </div>

    <h2 class="section-title">⚔️ Historique des matchs</h2>
    <div class="match-grid">
      <MatchCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
        @update-score="handleUpdateScore"
      />
    </div>

    <ConfirmationModal
      v-if="showConfirmationModal"
      :message="'Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible et entraînera la suppression des matchs qui impliquent cette équipe.'"
      :close="() => (showConfirmationModal = false)"
      :confirm="handleDeleteTeam"
      :show="showConfirmationModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "gsap";
import MatchCard from "~/components/match/MatchCard.vue";
import ConfirmationModal from "~/components/modals/ConfirmationModal.vue";
import { fetchTeam, updateTeamName, deleteTeam } from "@/services/teamService";
import { fetchMatchesByTeam, updateMatchScore } from "@/services/matchService";

const route = useRoute();
const router = useRouter();
const team = ref({});
const matches = ref([]);
const newName = ref("");
const showConfirmationModal = ref(false);

/**
 * Load team data.
 */
const loadTeam = async () => {
  try {
    team.value = await fetchTeam(route.params.id);
    newName.value = team.value.name;
  } catch (error) {
    console.error("Error loading team");
  }
};

/**
 * Load matches played by this team.
 */
const loadMatches = async () => {
  try {
    matches.value = await fetchMatchesByTeam(route.params.id);
  } catch (error) {
    console.error("Error loading matches");
  }
};

/**
 * Confirm team deletion.
 */
const confirmDelete = () => {
  showConfirmationModal.value = true;
};

/**
 * Delete the team and redirect to tournament page.
 */
const handleDeleteTeam = async () => {
  try {
    await deleteTeam(route.params.id);
    router.push(`/tournament/${team.value.tournamentId}`);
  } catch (error) {
    console.error("Error deleting team");
  }
};

/**
 * Update match score.
 */
const handleUpdateScore = async (matchId, score1, score2) => {
  try {
    await updateMatchScore(matchId, score1, score2);
    loadMatches();
  } catch (error) {
    console.error("Error updating score");
  }
};

/**
 * Update team name.
 */
const handleUpdateTeamName = async () => {
  try {
    await updateTeamName(route.params.id, newName.value);
    team.value.name = newName.value;
  } catch (error) {
    console.error("Error updating team name");
  }
};

onMounted(() => {
  loadTeam();
  loadMatches();
  gsap.from("h1", { opacity: 0, y: -20, duration: 0.5 });
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.team-card {
  background: #ff66a3;
  padding: 20px;
  margin-top: 25px;
  border: 4px solid black;
  box-shadow: 10px 10px 0 black;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
}

.edit-section {
  margin-top: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 800;
  color: black;
  margin-bottom: 10px;
  margin-top: 20px;
}

.input-group {
  display: flex;
  gap: 10px;
}

.neo-input {
  flex: 1;
  font-size: 16px;
  padding: 10px;
  border: 4px solid black;
  background: white;
  box-shadow: 5px 5px 0 black;
  transition: 0.2s;
}

.match-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.neo-btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: 4px solid black;
  box-shadow: 5px 5px 0 black;
  transition: 0.2s;
  cursor: pointer;
}

.neo-green {
  background: #4ade80;
}

.neo-yellow {
  background: yellow;
}

.neo-red {
  background: #e52020;
}
</style>
