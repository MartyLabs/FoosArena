<template>
  <button class="btn-3d" @click="onClick" :disabled="disabled">
    <span>{{ label }}</span>
    <component v-if="icon" :is="icon" class="ml-2 h-5 w-5" />
  </button>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  label: String,
  icon: [Object, null],
  onClick: Function,
  disabled: Boolean,
});
</script>

<style scoped>
.btn-3d {
  align-items: center;
  background-color: #8e47ff;
  border: 2px solid #000;
  border-radius: 82px;
  box-shadow: 0 4px 0 0 #000;
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.0175rem;
  line-height: 1.14;
  padding: 18px 36px;
  position: relative;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.28, 0.44, 0.49, 1);
  cursor: pointer;
}

.btn-3d:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 0 0 #000;
}

.dark .btn-3d {
  background-color: #673ab7;
  border-color: #fff;
  box-shadow: 0 4px 0 0 #fff;
}

.dark .btn-3d:hover {
  box-shadow: 0 2px 0 0 #fff;
}

.btn-3d:disabled {
  background: #c4c4c4;
  border-color: #777;
  color: #777;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
