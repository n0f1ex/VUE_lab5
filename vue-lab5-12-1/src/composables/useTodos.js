import { ref, computed, watch } from 'vue'
import {
  fetchTodos,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi
} from '../services/todoApi'

const STORAGE_KEY = 'vue_todos_v1'

export function useTodos() {
  const todos = ref([])
  const loading = ref(false)
  const error = ref('')

  const completedCount = computed(() => todos.value.filter(t => t.completed).length)

  function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        todos.value = parsed
        return true
      }
    } catch {
      // ignore parse error
    }
    return false
  }

  async function initTodos() {
    loading.value = true
    error.value = ''
    try {
      const hasLocal = loadFromStorage()
      if (!hasLocal) {
        const data = await fetchTodos()
        // Ограничим до 15 для удобства
        todos.value = data.slice(0, 15)
      }
    } catch (e) {
      error.value = e.message || 'Не удалось загрузить задачи'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title) {
    error.value = ''
    const payload = {
      userId: 1,
      title: title.trim(),
      completed: false
    }

    const created = await createTodoApi(payload)
    // Меняем состояние ТОЛЬКО после успешного API
    todos.value.unshift({
      id: created.id ?? Date.now(), // fallback
      ...payload
    })
  }

  async function toggleTodo(todo) {
    error.value = ''
    const updated = await updateTodoApi(todo.id, { completed: !todo.completed })
    // после валидного ответа
    const idx = todos.value.findIndex(t => t.id === todo.id)
    if (idx !== -1) {
      todos.value[idx] = {
        ...todos.value[idx],
        completed: updated.completed ?? !todo.completed
      }
    }
  }

  async function removeTodo(id) {
    error.value = ''
    await deleteTodoApi(id)
    // после валидного ответа
    todos.value = todos.value.filter(t => t.id !== id)
  }

  watch(
    todos,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )

  return {
    todos,
    loading,
    error,
    completedCount,
    initTodos,
    addTodo,
    toggleTodo,
    removeTodo
  }
}