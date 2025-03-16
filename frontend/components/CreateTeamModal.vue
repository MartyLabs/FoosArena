<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <div v-if="show" class="overlay">
        <div class="modal">
          <h2 class="modal-title">AJOUTER UNE ÉQUIPE</h2>

          <div class="input-container">
            <input
              v-model="name"
              type="text"
              placeholder="Nom de l'équipe"
              class="neo-input"
            />
          </div>

          <div class="button-group">
            <button @click="createTeam" class="neo-btn neo-green">
              ✅ Ajouter
            </button>
            <button @click="$emit('close')" class="neo-btn neo-red">
              ❌ Annuler
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import gsap from "gsap";

const props = defineProps({
  tournamentId: String,
});

const name = ref("");
const show = ref(true);

const createTeam = async () => {
  try {
    await axios.post("http://localhost:5000/teams", {
      name: name.value,
      tournamentId: props.tournamentId,
    });
    window.location.reload();
  } catch (error) {
    console.error("Error adding team", error);
  }
};

// GSAP animation from modal to display
onMounted(() => {
  gsap.fromTo(
    ".modal",
    { scale: 0.7, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
  );
});
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: yellow;
  border: 4px solid black;
  box-shadow: 8px 8px 0 black;
  padding: 25px;
  max-width: 400px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.modal-title {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  color: black;
  margin-bottom: 10px;
}

.neo-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  border: 3px solid black;
  background: white;
  text-align: center;
  box-shadow: 5px 5px 0 black;
  transition: all 0.2s ease;
}

.neo-input:focus {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 8px 8px 0 black;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.neo-btn {
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  border: 3px solid black;
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

.neo-red {
  background: #ff3b3b;
  color: white;
}

.neo-red:hover {
  background: #d62626;
}
</style>
