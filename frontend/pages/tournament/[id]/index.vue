<template>
  <div class="container">
    <div class="flex flex-row justify-between">
      <NuxtLink to="/" class="back-link">⬅ Retour à l'accueil</NuxtLink>
      <div class="flex flex-row gap-5">
        <NuxtLink
          :to="`/tournament/${tournament.id}/leaderboard`"
          class="back-link neo-white"
        >
          🏅 Voir le Classement
        </NuxtLink>

        <button @click="confirmDelete" class="back-link neo-red">
          ❌ Supprimer le tournoi
        </button>
      </div>
    </div>

    <div class="tournament-card">
      <h1 class="title">🏆 {{ tournament.name }}</h1>
      <p class="desc">{{ tournament.description }}</p>
      <p class="date">
        📅 {{ new Date(tournament.date).toLocaleDateString() }}
      </p>
    </div>

    <div class="teams-section">
      <h2 class="section-title">👥 Équipes participantes</h2>
      <div class="grid">
        <TeamCard v-for="team in teams" :key="team.id" :team="team" />
      </div>
    </div>

    <div class="button-group">
      <button @click="showModal = true" class="neo-btn neo-green">
        ➕ Ajouter une équipe
      </button>

      <button
        @click="handleMatchGeneration"
        :disabled="teams.length < 2"
        class="neo-btn"
        :class="teams.length < 2 ? 'neo-disabled' : 'neo-blue'"
      >
        ⚔️ Générer les matchs
      </button>

      <button v-if="hasMatches" @click="viewMatches" class="neo-btn neo-orange">
        📺 Voir les matchs
      </button>
    </div>

    <CreateTeamModal
      v-if="showModal"
      :tournamentId="tournament.id"
      @close="showModal = false"
    />

    <ConfirmationModal
      v-if="showConfirmationModal"
      :message="'Des matchs existent déjà. Voulez-vous les supprimer et en recréer ?'"
      :close="() => (showConfirmationModal = false)"
      :confirm="() => generateMatches(true)"
      :show="showConfirmationModal"
    />

    <ConfirmationModal
      v-if="showConfirmationDeleteModal"
      :message="'Êtes-vous vraiment sûr de vouloir supprimer ce tournoi ? Cette action est définitive et entraînera la suppression de tous les matchs et équipes associés… Un peu comme un rm -rf /, mais en plus propre.'"
      :close="() => (showConfirmationDeleteModal = false)"
      :confirm="deleteTournament"
      :show="showConfirmationDeleteModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import TeamCard from "~/components/TeamCard.vue";
import CreateTeamModal from "~/components/CreateTeamModal.vue";
import ConfirmationModal from "~/components/ConfirmationModal.vue";

const route = useRoute();
const router = useRouter();
const tournament = ref({});
const teams = ref([]);
const hasMatches = ref(false);
const showModal = ref(false);
const showConfirmationModal = ref(false);
const showConfirmationDeleteModal = ref(false);

const fetchTournament = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/tournaments/${route.params.id}`
    );
    tournament.value = response.data;
  } catch (error) {
    console.error("Error loading tournament", error);
    router.push("/");
  }
};

const viewMatches = () => {
  router.push(`/tournament/${route.params.id}/matches`);
};

const fetchTeams = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/teams/${route.params.id}`
    );
    teams.value = response.data;
  } catch (error) {
    console.error("Shift loading error", error);
  }
};

const checkExistingMatches = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/matches/${route.params.id}`
    );
    hasMatches.value = response.data.matches.length > 0;
  } catch (error) {
    console.error("Error when checking matches", error);
  }
};

const handleMatchGeneration = async () => {
  await checkExistingMatches();
  if (hasMatches.value) {
    showConfirmationModal.value = true;
  } else {
    await generateMatches(false);
  }
};

const generateMatches = async (forceGenerate) => {
  try {
    if (forceGenerate) {
      await axios.delete(`http://localhost:5000/matches/${route.params.id}`);
    }
    await axios.post(
      `http://localhost:5000/matches/generate/${route.params.id}`
    );
    router.push(`/tournament/${route.params.id}/matches`);
  } catch (error) {
    console.error("Error when generating matches", error);
  }
};

const confirmDelete = () => {
  showConfirmationDeleteModal.value = true;
};

const deleteTournament = async () => {
  try {
    await axios.delete(`http://localhost:5000/tournaments/${route.params.id}`);
    router.push("/");
  } catch (error) {
    console.error("Error deleting tournament", error);
  }
};

onMounted(() => {
  fetchTournament();
  fetchTeams();
  checkExistingMatches();
});
</script>

<style scoped>
.container {
  max-width: 800px;
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
  margin-bottom: 10px;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 7px 7px 0 black;
}

.tournament-card {
  background: #ff66a3;
  padding: 20px;
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

.date {
  font-size: 14px;
  font-weight: 700;
  color: yellow;
}

.teams-section {
  margin-top: 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: black;
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

.neo-blue {
  background: #1ac2ff;
}

.neo-green {
  background: #4ade80;
}

.neo-white {
  background: #ffffff;
}

.neo-orange {
  background: #ff9f1c;
}

.neo-red {
  background: #e52020;
}

.neo-orange:hover {
  background: #ff851b;
}

.neo-disabled {
  background: #ddd;
  color: #666;
  cursor: not-allowed;
  box-shadow: none;
}

.button-group {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  margin-top: 25px;
}
</style>
