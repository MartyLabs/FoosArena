<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <div v-if="show" class="overlay">
        <div class="modal">
          <div class="icon-container">⚠️</div>
          <h2 class="modal-title">ALERTE !</h2>

          <p class="modal-text">
            {{ message }}
          </p>

          <div class="button-group">
            <button @click="close" class="neo-btn neo-gray">Annuler</button>
            <button @click="confirm" class="neo-btn neo-red">Confirmer</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import gsap from "gsap";

defineProps({
  message: String,
  close: Function,
  confirm: Function,
  show: Boolean,
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
  max-width: 380px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.icon-container {
  font-size: 50px;
  margin-bottom: 10px;
}

.modal-title {
  font-size: 22px;
  font-weight: 900;
  text-transform: uppercase;
  color: black;
  margin-bottom: 8px;
}

.modal-text {
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
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

.neo-red {
  background: #ff3b3b;
  color: white;
}

.neo-red:hover {
  background: #d62626;
}

.neo-gray {
  background: #ddd;
  color: black;
}
</style>
// Update Sat Mar 15 08:29:16 PM CET 2025
