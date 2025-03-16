<template>
  <div>
    <header class="navbar" :class="{ 'dark-mode': isDark }">
      <div class="navbar-container">
        <NuxtLink to="/" class="logo">
          <img src="public/logo.svg" alt="Logo" class="logo-img" />
          <span>FoosArena</span>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink to="/" class="nav-item">🏠 Accueil</NuxtLink>

          <div class="dropdown">
            <button @click="toggleDropdown" class="nav-item">
              🏆 Tournois <span>▼</span>
            </button>
            <div v-if="dropdownOpen" class="dropdown-menu">
              <NuxtLink
                v-for="tournament in tournaments"
                :key="tournament.id"
                :to="`/tournament/${tournament.id}`"
                class="dropdown-item"
                @click="dropdownOpen = false"
              >
                {{ tournament.name }}
              </NuxtLink>
            </div>
          </div>
        </nav>

        <div class="toggle-container" @click="toggleDarkMode">
          <div class="toggle-box">
            <div class="toggle-circle" :class="{ 'toggle-dark': isDark }">
              <span v-if="isDark" class="icon">🌙</span>
              <span v-else class="icon">☀️</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="page-content" :class="{ 'dark-mode-content': isDark }">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchTournaments } from "@/services/tournamentService";

const dropdownOpen = ref(false);
const tournaments = ref([]);
const isDark = ref(false);

/**
 * Load tournaments from the API.
 */
const loadTournaments = async () => {
  try {
    tournaments.value = await fetchTournaments();
  } catch (error) {
    console.error("Error loading tournaments");
  }
};

/**
 * Toggle dark mode and save preference in localStorage.
 */
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("darkMode", isDark.value ? "enabled" : "disabled");
  document.documentElement.classList.toggle("dark", isDark.value);
};

/**
 * Toggle dropdown visibility.
 */
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

onMounted(() => {
  loadTournaments();
  const savedMode = localStorage.getItem("darkMode");
  isDark.value =
    savedMode === "enabled" ||
    (!savedMode && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  }
});
</script>

<style scoped>
/* 🔥 NAVIGATION BAR STYLES */
.navbar {
  width: 100%;
  background: #ff66a3;
  padding: 14px;
  border-bottom: 10px solid black;
  position: fixed;
  z-index: 1000;
}

.dark-mode {
  background: #1e1e1e;
  border-bottom: 4px solid white;
}

.navbar-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 900;
  color: black;
  text-transform: uppercase;
}

.dark-mode .logo {
  color: white;
}

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}

/* 🔗 NAVIGATION LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 16px;
  border: 3px solid black;
  background: white;
  box-shadow: 4px 4px 0 black;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}

.dark-mode .nav-item {
  background: black;
  color: white;
  border: 3px solid white;
}

/* ⬇️ DROPDOWN MENU */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 3px solid black;
  box-shadow: 4px 4px 0 black;
  z-index: 10;
  width: 180px;
  padding: 10px;
}

.dropdown-item {
  display: block;
  padding: 8px 12px;
  font-weight: bold;
  border-bottom: 2px solid black;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #ffcc00;
}

/* 🌙 DARK MODE TOGGLE */
.toggle-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 4px solid black;
  background: #ff66a3;
  box-shadow: 6px 6px 0 black;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.toggle-container:hover {
  transform: translateY(-2px);
  box-shadow: 8px 8px 0 black;
}

.toggle-box {
  width: 60px;
  height: 30px;
  border: 4px solid black;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  box-shadow: inset 0 0 0 4px black;
  overflow: hidden;
}

.toggle-dark {
  transform: translateX(30px);
  background: yellow;
  color: black;
  box-shadow: 2px 2px 0 black;
}

.toggle-circle {
  width: 25px;
  height: 25px;
  background: black;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.dark-mode .toggle-container {
  background: #555;
}

.dark-mode .toggle-circle {
  background: yellow;
}

.dark-mode .icon {
  opacity: 1;
}

/* 📄 PAGE CONTENT */
.page-content {
  background: #f9f5f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dark-mode-content {
  background: black;
  color: white;
}
</style>
