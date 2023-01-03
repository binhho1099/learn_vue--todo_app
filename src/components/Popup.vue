<template>
  <h2>This is popup</h2>
  <button @click="$emit('closePopup', false)">Close Popup</button>
</template>

<script lang="ts">
export default {
  name: 'Popup',
  emits: ['closePopup'],
};
</script>

<style>
h6 {
  color: blue;
}
</style>
