<template>
  <Teleport to="body">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="popup">
        <header class="popup__header">
          <h3 class="popup__title">{{ title }}</h3>
          <button class="icon-btn" @click="emit('close')">✕</button>
        </header>

        <section class="popup__content">
          <slot />
        </section>

        <footer v-if="$slots.actions" class="popup__actions">
          <slot name="actions" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Popup' }
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: grid;
  place-items: center;
  z-index: 999;
}
.popup {
  width: min(480px, 92vw);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,.25);
  overflow: hidden;
}
.popup__header, .popup__actions {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}
.popup__actions {
  border-bottom: 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.popup__title {
  margin: 0;
  font-size: 18px;
}
.popup__content {
  padding: 16px;
}
.icon-btn {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  float: right;
}
</style>