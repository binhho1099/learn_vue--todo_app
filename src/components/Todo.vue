<template>
  <li>
    <input type="checkbox" @change="changeComplete(todo.id)" />
    <span :class="{ complete: todo.isComplete }">
      {{ props.todo.content }} - {{ props.todo.category }}</span
    >
    <button @click="deleteTodoList(todo.id)">Delete</button>
  </li>
</template>

<script setup lang="ts">
import { ITodo } from '../App.vue';
import { inject } from 'vue';

const props = defineProps<{
  todo: ITodo;
}>();

const { deleteTodoList, changeComplete } = inject('todoList');
</script>

<style>
.complete {
  text-decoration: line-through;
}
h6 {
  color: #333;
}
</style>
