<script setup>
import { ref } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['button-clicked'])

const count = ref(0)

function handleClick() {
  count.value += props.amount
  emit('button-clicked')
}
</script>

<template>
  <div class="clicker">
    <p class="score">Очки: {{ count }}</p>

    <!-- Любой контент слота становится "кнопкой" -->
    <div class="button-slot" role="button" tabindex="0" @click="handleClick" @keydown.enter="handleClick" @keydown.space.prevent="handleClick">
      <slot>
        <!-- fallback, если слот не передали -->
        <button type="button">Клик</button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.clicker {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
}

.score {
  margin: 0 0 8px;
  font-size: 14px;
}

.button-slot {
  display: inline-block;
  cursor: pointer;
}
</style>