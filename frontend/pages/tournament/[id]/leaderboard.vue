<template>
  <div class="container">
    <NuxtLink :to="`/tournament/${tournamentId}`" class="neo-btn neo-yellow">
      ⬅ Retour au tournoi
    </NuxtLink>

    <h1 class="title">📊 Classement</h1>

    <div class="table-container">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>🏆 Rang</th>
            <th>Équipe</th>
            <th>Matchs Joués</th>
            <th>Victoires</th>
            <th>Défaites</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(team, index) in leaderboard"
            :key="team.teamName"
            class="animate-row"
          >
            <td>{{ index + 1 }}</td>
            <td class="team-name">{{ team.teamName }}</td>
            <td>{{ team.gamesPlayed }}</td>
            <td class="text-green">{{ team.wins }}</td>
            <td class="text-red">{{ team.losses }}</td>
            <td class="text-yellow">{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="chart-container">
      <LeaderboardChart :leaderboard="leaderboard" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import LeaderboardChart from "~/components/LeaderboardChart.vue";
import gsap from "gsap";

const route = useRoute();
const tournamentId = ref(route.params.id);
const leaderboard = ref([]);

// Recovering the ranking
const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/tournaments/${tournamentId.value}/leaderboard`
    );
    leaderboard.value = response.data;
  } catch (error) {
    console.error("Error loading the classification", error);
  }
};

onMounted(() => {
  fetchLeaderboard();
  gsap.from(".animate-row", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 });
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.neo-btn {
  position: absolute;
  top: 110px;
  left: 20px;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  border: 4px solid black;
  box-shadow: 5px 5px 0 black;
  transition: 0.2s;
  cursor: pointer;
  display: inline-block;
}

.neo-btn:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 black;
}

.neo-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 black;
}

.neo-yellow {
  background: yellow;
  color: black;
}

.title {
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  color: black;
  margin: 20px 0;
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.8);
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  background: #ff66a3;
  border: 4px solid black;
  box-shadow: 10px 10px 0 black;
}

.leaderboard-table th,
.leaderboard-table td {
  padding: 15px;
  border: 3px solid black;
  text-align: center;
  font-size: 16px;
}

.leaderboard-table th {
  background: white;
  font-weight: 900;
}

.team-name {
  font-weight: 900;
  color: white;
}

.text-green {
  color: #4ade80;
  font-weight: 700;
}

.text-red {
  color: #ff6666;
  font-weight: 700;
}

.text-yellow {
  color: yellow;
  font-weight: 900;
}

.chart-container {
  margin-top: 40px;
}
</style>
// Update Sat Mar 15 08:29:16 PM CET 2025
