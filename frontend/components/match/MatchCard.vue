<template>
  <NuxtLink :to="`/match/${match.id}`" class="match-card">
    <h2 class="match-title">
      🏆 {{ match.team1.name }} <span>VS</span> {{ match.team2.name }}
    </h2>

    <div class="score-container">
      <input
        disabled="true"
        v-model="localScore1"
        type="number"
        min="0"
        class="score-input"
      />
      <span class="score-separator">-</span>
      <input
        disabled="true"
        v-model="localScore2"
        type="number"
        min="0"
        class="score-input"
      />
    </div>

    <button class="neo-btn neo-blue">Mettre à jour le score</button>
  </NuxtLink>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const props = defineProps({
  match: Object,
});

const localScore1 = ref(props.match.score1 || 0);
const localScore2 = ref(props.match.score2 || 0);
</script>

<style scoped>
.match-card {
  background: #ff66a3;
  padding: 20px;
  border: 4px solid black;
  box-shadow: 8px 8px 0 black;
  text-align: center;
  transition: 0.2s;
}

.match-title {
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  color: black;
  margin-bottom: 10px;
}

.match-title span {
  color: black;
  background: yellow;
  padding: 3px 8px;
  border: 3px solid black;
}

.score-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.score-input {
  width: 50px;
  font-size: 18px;
  text-align: center;
  font-weight: 900;
  border: 4px solid black;
  background: white;
  padding: 8px;
  transition: 0.2s;
}

.score-input:hover {
  background: yellow;
}

.score-separator {
  font-size: 22px;
  font-weight: 800;
  color: black;
}

.neo-btn {
  padding: 10px 15px;
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
.neo-blue:hover {
  background: #0099e5;
}
</style>
