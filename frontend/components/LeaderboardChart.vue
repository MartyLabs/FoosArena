<template>
  <div class="chart-container">
    <BarChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { BarChart } from "vue-chart-3";

// Automatic registration of all necessary Chart.js components
Chart.register(...registerables);

const props = defineProps({
  leaderboard: Array,
});

// Formatting leaderboard data for Chart.js
const chartData = computed(() => ({
  labels: props.leaderboard.map((team) => team.teamName),
  datasets: [
    {
      label: "Points",
      data: props.leaderboard.map((team) => team.points),
      backgroundColor: "#ff66a3",
      borderColor: "black",
      borderWidth: 3,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Classement des équipes",
    },
  },
}));
</script>

<style scoped>
.chart-container {
  max-width: 700px;
  margin: 0 auto;
  height: 400px;
}
</style>
// Update Sat Mar 15 08:29:16 PM CET 2025
