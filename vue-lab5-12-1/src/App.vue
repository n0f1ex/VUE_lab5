<template>
  <main class="app">
    <h1>Todo List</h1>
    <TodoList />
  </main>
</template>

<script setup>
import TodoList from './components/TodoList.vue'
</script>

<style scoped>
.app {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: Inter, system-ui, Arial, sans-serif;
}
h1 {
  margin-bottom: 20px;
}
</style>