<template>
  <div class="wrapper">
    <Nav />

    <div class="content">
      <NewTask @add-task="setNewTask" />
      <!-- <NewTask /> -->
      <TaskItem
        :tasks="addNewTask.tasks"
        @toggle-reminder="toggleReminder"
        @delete-task="deleteTaskArr"
        @change-name="changeName"
      />
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import NewTask from "../components/NewTask.vue";
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import TaskItem from "../components/TaskItem.vue";
// import { created } from 'vue'

const addNewTask = useTaskStore();

//hacemos el primer fetch de las tasks
addNewTask.fetchTasks();

//cada vez que se ejecuta alguna accion, volvemos a hacer el fetch para poder traer data actualizada
async function setNewTask(task) {
  await addNewTask.addTask(task.name, task.description);
  addNewTask.fetchTasks();
}

async function toggleReminder(task) {
  await addNewTask.toggleTask(task.is_complete, task.id);
  addNewTask.fetchTasks();
}

async function deleteTaskArr(task) {
  await addNewTask.deleteTask(task.id);
  addNewTask.fetchTasks();
}

async function changeName(task) {
  await addNewTask.editTask(task.title, task.description, task.id);
  addNewTask.fetchTasks();
}
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content {
  background-color: #f3f4f6;
  flex: 1 1 auto;
}
</style>
