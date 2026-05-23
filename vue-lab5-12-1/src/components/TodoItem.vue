<template>
  <li class="todo-item">
    <label class="todo-main">
      <input
        type="checkbox"
        :checked="todo.completed"
        :disabled="busy"
        @change="$emit('toggle', todo)"
      />
      <span :class="{ done: todo.completed }">{{ todo.title }}</span>
    </label>

    <button class="danger" :disabled="busy" @click="$emit('ask-remove', todo)">
      Удалить
    </button>
  </li>
</template>

<script setup>
defineProps({
  todo: { type: Object, required: true },
  busy: { type: Boolean, default: false }
})

defineEmits(['toggle', 'ask-remove'])
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}
.todo-main {
  display: flex;
  gap: 10px;
  align-items: center;
}
.done {
  text-decoration: line-through;
  color: #888;
}
.danger {
  border: 1px solid #d22;
  color: #d22;
  background: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>