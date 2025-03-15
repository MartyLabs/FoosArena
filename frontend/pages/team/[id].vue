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
        <button @click="updateTeamName" class="neo-btn neo-green">
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
        @update-score="updateScore"
      />
    </div>

    <ConfirmationModal
      v-if="showConfirmationModal"
      :message="'Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible et entraînera la suppression des matchs qui impliquent cette équipe.'"
      :close="() => (showConfirmationModal = false)"
      :confirm="deleteTeam"
      :show="showConfirmationModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MatchCard from "~/components/MatchCard.vue";
import ConfirmationModal from "~/components/ConfirmationModal.vue";
import gsap from "gsap";

const route = useRoute();
const router = useRouter();
const team = ref({});
const matches = ref([]);
const newName = ref("");
const showConfirmationModal = ref(false);

// Retrieving team information
const fetchTeam = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/teams/single/${route.params.id}`
    );
    team.value = response.data;
    newName.value = team.value.name;
  } catch (error) {
    console.error("Team loading error", error);
  }
};

// Retrieve team matches
const fetchMatches = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/matches/team/${route.params.id}`
    );
    matches.value = response.data.matches;
  } catch (error) {
    console.error("Error loading matches", error);
  }
};

const confirmDelete = () => {
  showConfirmationModal.value = true;
};

const deleteTeam = async () => {
  try {
    await axios.delete(`http://localhost:5000/teams/${route.params.id}`);
    router.push(`/tournament/${team.value.tournamentId}`);
  } catch (error) {
    console.error("Team deletion error", error);
  }
};

const updateScore = async (matchId, score1, score2) => {
  try {
    await axios.post(`http://localhost:5000/matches/update-score/${matchId}`, {
      score1,
      score2,
    });
    fetchMatches();
  } catch (error) {
    console.error("Error updating score", error);
  }
};

// Update team name
const updateTeamName = async () => {
  try {
    await axios.put(`http://localhost:5000/teams/${route.params.id}`, {
      name: newName.value,
    });
    team.value.name = newName.value;
  } catch (error) {
    console.error("Error updating name", error);
  }
};

onMounted(() => {
  fetchTeam();
  fetchMatches();
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

.desc {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.tournament-link {
  color: yellow;
  font-weight: bold;
  text-decoration: underline;
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

.neo-input:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 black;
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

.neo-btn:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 black;
}

.neo-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 black;
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
// Update Sat Mar 15 08:29:16 PM CET 2025
