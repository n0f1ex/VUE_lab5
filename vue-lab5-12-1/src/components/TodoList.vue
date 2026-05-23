<template>
  <section>
    <form class="add-form" @submit.prevent="onSubmit">
      <input
        v-model="newTitle"
        placeholder="Новая задача..."
        :disabled="busy"
      />
      <button :disabled="busy || !newTitle.trim()">Добавить</button>
    </form>

    <p v-if="loading">Загрузка...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <p class="meta">Выполнено: {{ completedCount }} / {{ todos.length }}</p>

    <ul class="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :busy="busy"
        @toggle="onToggle"
        @ask-remove="openDeleteConfirm"
      />
    </ul>

    <Popup
      :open="confirmOpen"
      title="Подтверждение удаления"
      @close="closeConfirm"
    >
      <p>
        Удалить задачу:
        <strong>«{{ selectedTodo?.title }}»</strong>?
      </p>

      <template #actions>
        <button @click="closeConfirm">Отмена</button>
        <button class="danger-fill" :disabled="busy" @click="confirmDelete">
          Да, удалить
        </button>
      </template>
    </Popup>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodos } from '../composables/useTodos'
import TodoItem from './TodoItem.vue'
import Popup from './Popup.vue'

const {
  todos,
  loading,
  error,
  completedCount,
  initTodos,
  addTodo,
  toggleTodo,
  removeTodo
} = useTodos()

const newTitle = ref('')
const busy = ref(false)

const confirmOpen = ref(false)
const selectedTodo = ref(null)

onMounted(initTodos)

async function onSubmit() {
  if (!newTitle.value.trim()) return
  busy.value = true
  try {
    await addTodo(newTitle.value)
    newTitle.value = ''
  } catch (e) {
    console.error(e)
  } finally {
    busy.value = false
  }
}

async function onToggle(todo) {
  busy.value = true
  try {
    await toggleTodo(todo)
  } catch (e) {
    console.error(e)
  } finally {
    busy.value = false
  }
}

function openDeleteConfirm(todo) {
  selectedTodo.value = todo
  confirmOpen.value = true
}

function closeConfirm() {
  confirmOpen.value = false
  selectedTodo.value = null
}

async function confirmDelete() {
  if (!selectedTodo.value) return
  busy.value = true
  try {
    await removeTodo(selectedTodo.value.id)
    closeConfirm()
  } catch (e) {
    console.error(e)
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}
input {
  flex: 1;
  padding: 10px 12px;
}
button {
  padding: 10px 12px;
  cursor: pointer;
}
.list {
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
}
.error {
  color: #d22;
}
.meta {
  color: #555;
  margin-bottom: 10px;
}
.danger-fill {
  border: 1px solid #d22;
  background: #d22;
  color: #fff;
}
</style>