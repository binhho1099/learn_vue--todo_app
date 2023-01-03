<script setup lang="ts">
import { ITodo } from '../App.vue';
import Todo from './Todo.vue';

const props = defineProps<{
  todos: ITodo[];
}>();
</script>

<template>
  <ul>
    <Todo v-for="todo in props.todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<style>
h6 {
  color: aqua;
}
</style>
