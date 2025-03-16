<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- En-tête -->
      <div class="modal-header">🏆 Nouveau Tournoi</div>

      <!-- Formulaire -->
      <div class="modal-body">
        <div class="input__container">
          <div class="shadow__input"></div>
          <input
            v-model="name"
            type="text"
            class="input__search"
            placeholder="Nom du tournoi"
          />
        </div>

        <div class="input__container">
          <div class="shadow__input"></div>
          <input v-model="date" type="date" class="input__search" />
        </div>

        <div class="input__container">
          <div class="shadow__input"></div>
          <textarea
            v-model="description"
            class="input__search textarea"
            placeholder="Description"
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="createTournament" class="btn btn-primary">
          ✅ Créer
        </button>
        <button @click="$emit('close')" class="btn btn-secondary">
          ❌ Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const date = ref("");
const description = ref("");

const createTournament = async () => {
  try {
    await axios.post("http://localhost:5000/tournaments", {
      name: name.value,
      date: date.value,
      description: description.value,
    });
    window.location.reload();
  } catch (error) {
    console.error("Tournament creation error", error);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background: #ff66a3;
  width: 400px;
  padding: 20px;
  border: 4px solid black;
  box-shadow: 10px 10px 0 black;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  animation: slideIn 0.4s ease-out;
}

.modal-header {
  background: white;
  padding: 12px;
  border-bottom: 4px solid black;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
}

.modal-body {
  margin-top: 20px;
  margin-bottom: 30px;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input__container {
  position: relative;
  background: #f0f0f0;
  padding: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border: 4px solid #000;
  max-width: 350px;
  margin: auto;
  margin-bottom: 20px;
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
  transform: rotateX(10deg) rotateY(-10deg);
  perspective: 1000px;
  box-shadow: 10px 10px 0 #000;
}

.input__container:hover {
  transform: rotateX(5deg) rotateY(1deg) scale(1.05);
}

.shadow__input {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
  transform: translateZ(-50px);
  background: linear-gradient(
    45deg,
    rgba(255, 107, 107, 0.4) 0%,
    rgba(255, 107, 107, 0.1) 100%
  );
  filter: blur(20px);
}

.input__search {
  width: 100%;
  outline: none;
  border: 3px solid #000;
  padding: 12px;
  font-size: 16px;
  background: #fff;
  color: #000;
  transform: translateZ(10px);
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 3;
  font-family: "Roboto", Arial, sans-serif;
  letter-spacing: -0.5px;
}

.input__search::placeholder {
  color: #666;
  font-weight: bold;
  text-transform: uppercase;
}

.input__search:hover,
.input__search:focus {
  background: #f0f0f0;
  transform: translateZ(20px) translateX(-5px) translateY(-5px);
  box-shadow: 5px 5px 0 0 #000;
}

.btn {
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  border: 4px solid black;
  box-shadow: 4px 4px 0 black;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.btn-primary {
  background: #4ade80;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}

.btn-primary:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 black;
}

.btn-secondary {
  background: #f68144;
}

.btn-secondary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 black;
}

.btn-secondary:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 black;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
