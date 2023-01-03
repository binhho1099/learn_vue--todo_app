<script setup lang="ts">
import { ref, onMounted, computed, watch, provide } from 'vue';
import TodoList from './components/TodoList.vue';
import Popup from './components/Popup.vue';

export interface ITodo {
  id: number;
  content: string;
  createAt: Date;
  category: string;
  isComplete: boolean;
}

const todos = ref<ITodo[]>([] as ITodo[]);
const name = ref<string | null>('');
const showPopup = ref<boolean>(false);

const input_content = ref<string>('');
const input_category = ref<string>('');

const changeComplete = (id: number) => {
  todos.value[id].isComplete = !todos.value[id].isComplete;
};
const deleteTodoList = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

provide('todoList', {
  todos,
  deleteTodoList,
  changeComplete,
});

const todos_asc = computed(() =>
  todos.value.sort((a: any, b: any) => a.createAt - b.createAt)
);

const addTodo = (): void => {
  if (input_category.value === '' || input_content.value.trim() === '') {
    return;
  }
  const newTodo: ITodo = {
    id: todos.value.length,
    content: input_content.value,
    createAt: new Date(),
    category: input_category.value,
    isComplete: false,
  };

  todos.value.push(newTodo);
  resetTodo();
};

const resetTodo = () => {
  input_category.value = '';
  input_content.value = '';
};

watch(name, (newValue) => {
  localStorage.setItem('name', newValue!);
});

onMounted(() => {
  name.value = localStorage.getItem('name') || '';
});
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        What's up, <input type="text" placeholder="Name here" v-model="name" />
      </h2>
    </section>

    <section class="create-todo">
      <h3>CREATE A TODO</h3>
      <form @submit.prevent="addTodo">
        <h4>What's on your todo list?</h4>
        <input type="text" placeholder="learn Vuejs" v-model="input_content" />
        <h4>Pick a category</h4>
        <div class="options">
          <label for="category1">
            <input
              type="radio"
              name="category"
              id="category1"
              value="business"
              v-model="input_category"
            />
            business
          </label>
          <label for="category2">
            <input
              type="radio"
              name="category"
              id="category2"
              value="education"
              v-model="input_category"
            />
            education
          </label>

          <input type="submit" value="Add todo" />
        </div>
      </form>
    </section>

    <section class="list-todo">
      <TodoList :todos="todos" />
    </section>

    <Popup v-if="showPopup" @closePopup="(value) => (showPopup = value)" />
    <button @click="showPopup = true">show Popup</button>

    <h6>style components</h6>

    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/product">Product</router-link>
    </div>
    <router-view />
  </main>
</template>

<style>
h6 {
  color: crimson;
}
.active-class {
  color: red;
}
</style>
