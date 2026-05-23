<script setup>
import Clicker from './components/Clicker.vue'

function onClickerClicked(n) {
  alert(`Clicker ${n} clicked!`)
}
</script>

<template>
  <main class="page">
    <h1>100 кликеров</h1>

    <div class="grid">
      <Clicker
        v-for="n in 100"
        :key="n"
        :amount="n % 5 + 1"
        @button-clicked="() => onClickerClicked(n)"
      >
        <!-- Кастомизируемая кнопка через слот -->
        <button class="custom-btn" type="button">
          Clicker {{ n }} (+{{ n % 5 + 1 }})
        </button>
      </Clicker>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 12px;
}

.custom-btn {
  padding: 8px 10px;
  border: 1px solid #bbb;
  border-radius: 8px;
  background: #f6f6f6;
  cursor: pointer;
}

.custom-btn:hover {
  background: #ececec;
}
</style>