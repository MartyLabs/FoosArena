<template>
  <div class="stadium-container">
    <div class="stadium-bg">
      <div class="center-circle"></div>
      <div class="goal-box goal-left"></div>
      <div class="goal-box goal-right"></div>
    </div>

    <div class="match-overlay">
      <NuxtLink
        :to="`/tournament/${match.tournamentId}/matches`"
        class="back-link"
      >
        ⬅ Retour aux matchs
      </NuxtLink>

      <div class="match-card">
        <h1 class="match-title">
          ⚔️ {{ match.team1?.name }} VS {{ match.team2?.name }}
        </h1>

        <div class="score-container">
          <button class="score-btn" @click="decrementScore(1)">➖</button>
          <span class="team-score">{{ localScore1 }}</span>
          <button class="score-btn" @click="incrementScore(1)">➕</button>

          <span class="score-separator">-</span>

          <button class="score-btn" @click="decrementScore(2)">➖</button>
          <span class="team-score">{{ localScore2 }}</span>
          <button class="score-btn" @click="incrementScore(2)">➕</button>
        </div>

        <button @click="updateScore" class="neo-btn neo-blue">
          ✅ Mettre à jour le score
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchMatchDetails, updateMatchScore } from "@/services/matchService";

const toast = inject("toaster");
const route = useRoute();
const router = useRouter();
const match = ref({});
const localScore1 = ref(0);
const localScore2 = ref(0);

/**
 * Load match details.
 */
const loadMatchDetails = async () => {
  try {
    match.value = await fetchMatchDetails(route.params.id);
    localScore1.value = match.value.score1 || 0;
    localScore2.value = match.value.score2 || 0;
  } catch (error) {
    router.push("/");
  }
};

/**
 * Update match score.
 */
const updateScore = async () => {
  try {
    await updateMatchScore(
      route.params.id,
      localScore1.value,
      localScore2.value
    );
    toast.show("Score mis à jour avec succès ! 🎉", {
      type: "success",
      position: "top",
      duration: 3000,
      className: "custom-toaster success",
    });
  } catch (error) {
    toast.show("Erreur lors de la mise à jour du score ❌", {
      type: "error",
      position: "top-right",
      duration: 3000,
      className: "custom-toaster error",
    });
  }
};

/**
 * Increment the score.
 * @param {number} team - Team number (1 or 2).
 */
const incrementScore = (team) => {
  if (team === 1) localScore1.value++;
  else localScore2.value++;
};

/**
 * Decrement the score.
 * @param {number} team - Team number (1 or 2).
 */
const decrementScore = (team) => {
  if (team === 1 && localScore1.value > 0) localScore1.value--;
  else if (team === 2 && localScore2.value > 0) localScore2.value--;
};

onMounted(loadMatchDetails);
</script>

<style scoped>
.stadium-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(160deg, #008000 20%, #006400 80%);
}

.stadium-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85vw;
  height: 85vh;
  max-width: 800px;
  max-height: 450px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px solid white;
  border-radius: 15px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3);
}

.center-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 6px solid white;
  border-radius: 50%;
}

.goal-box {
  position: absolute;
  width: 35%;
  height: 100px;
  border: 6px solid white;
}

.goal-left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-left: none;
}

.goal-right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-right: none;
}

.match-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.match-card {
  background: #ff66a3;
  padding: 40px;
  border: 4px solid black;
  box-shadow: 15px 15px 0 black;
  text-align: center;
  max-width: 650px;
  width: 90%;
  border-radius: 20px;
  transform: perspective(1000px) rotateX(10deg);
  transition: transform 0.3s ease;
}

.match-card:hover {
  transform: perspective(1000px) rotateX(5deg) scale(1.05);
}

.match-title {
  font-size: 30px;
  font-weight: 900;
  color: white;
  margin-bottom: 20px;
}

.score-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.team-score {
  font-size: 32px;
  font-weight: 900;
  border: 4px solid black;
  background: white;
  padding: 12px 25px;
  border-radius: 10px;
}

.score-separator {
  font-size: 32px;
  font-weight: 800;
  color: white;
}

.score-btn {
  font-size: 26px;
  font-weight: 900;
  border: 4px solid black;
  padding: 8px 12px;
  background: yellow;
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.2s;
}

.score-btn:hover {
  transform: scale(1.1);
  box-shadow: 4px 4px 0 black;
}

.score-btn:active {
  transform: scale(0.9);
  box-shadow: none;
}

.back-link {
  position: absolute;
  top: 110px;
  left: 20px;
  font-size: 18px;
  font-weight: 800;
  color: black;
  text-decoration: none;
  border: 3px solid black;
  padding: 12px 18px;
  background: yellow;
  box-shadow: 6px 6px 0 black;
  border-radius: 10px;
  transition: 0.2s;
}

.back-link:hover {
  transform: translateY(-2px);
  box-shadow: 8px 8px 0 black;
}

.neo-btn {
  padding: 18px;
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  border: 4px solid black;
  box-shadow: 10px 10px 0 black;
  transition: 0.2s;
  cursor: pointer;
}

.neo-btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 black;
}

.neo-blue {
  background: #1ac2ff;
}
</style>
