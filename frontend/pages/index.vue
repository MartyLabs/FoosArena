<template>
  <div class="page-container">
    <h1 class="page-title">🏆 Tournois en cours</h1>

    <p class="page-subtitle">
      Retrouvez tous les tournois en cours et rejoignez la compétition !
    </p>

    <div v-if="tournaments.length > 0" class="grid-container">
      <div v-for="tournament in tournaments" :key="tournament.id" class="card">
        <div class="head">{{ tournament.name }}</div>
        <div class="content">
          <p class="desc">
            {{ truncateText(tournament.description) }}
          </p>
          <p class="date">📅 {{ formatDate(tournament.date) }}</p>
          <NuxtLink :to="`/tournament/${tournament.id}`" class="button"
            >Voir le tournoi</NuxtLink
          >
        </div>
      </div>
    </div>

    <div v-else class="empty-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="empty-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="16"></line>
      </svg>
      <p class="empty-text">Aucun tournoi disponible.</p>
      <p class="empty-subtext">Créez-en un et commencez la compétition !</p>
    </div>

    <div class="action-container">
      <button class="button create-btn" @click="openModal">
        ➕ Créer un tournoi
      </button>
    </div>

    <CreateTournamentModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CreateTournamentModal from "~/components/modals/CreateTournamentModal.vue";
import { fetchTournaments } from "@/services/tournamentService";
import { truncateText } from "#imports";

const tournaments = ref([]);
const showModal = ref(false);

/**
 * Load all tournaments.
 */
const loadTournaments = async () => {
  try {
    tournaments.value = await fetchTournaments();
  } catch (error) {
    console.error("Error loading tournaments");
  }
};

/**
 * Open the create tournament modal.
 */
const openModal = () => {
  showModal.value = true;
};

/**
 * Format date.
 * @param {string} date
 * @returns {string} Formatted date
 */
const formatDate = (date) => new Date(date).toLocaleDateString();

onMounted(loadTournaments);
</script>

<style scoped>
.action-container {
  padding-top: 15px;
}

.page-container {
  max-width: 1200px;
  margin: auto;
  padding: 3rem 1rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  color: black;
  text-shadow: 4px 4px 0px #ff66a3;
}

.page-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.5rem;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-top: 2rem;
}

.card {
  font-family: Montserrat, sans-serif;
  width: 320px;
  height: auto;
  padding-bottom: 15px;
  background: #ff66a3;
  border: 4px solid #000000;
  box-shadow: 10px 10px 0 #000000;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 14px 14px 0 #000000;
}

.head {
  font-size: 16px;
  font-weight: 900;
  background: #ffffff;
  padding: 10px;
  color: #000000;
  border-bottom: 4px solid #000000;
}

.content {
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
}

.date {
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 10px;
  color: black;
}

.button {
  display: inline-block;
  padding: 8px 12px;
  margin-top: 12px;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0 #000000;
  font-weight: 700;
  background: #4ade80;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #000000;
  background: #1ac2ff;
}

.button:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 #000000;
}

.create-btn {
  background: #ffcc00;
  border: 4px solid black;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
}

.empty-container {
  margin-top: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #444;
}

.empty-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.empty-text {
  font-size: 1.2rem;
  font-weight: bold;
}

.empty-subtext {
  font-size: 0.9rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid-container > * {
  animation: fadeInUp 0.4s ease-out forwards;
}
</style>
