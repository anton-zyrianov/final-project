<template>
  <div class="add-task-section">
    <div class="add-task-title">
      <h1>Add a new Task</h1>
    </div>

    <div class="add-task-description">
      <p class="add-task-text">
        Keep your life organized, prepare for a trip ? Start here
      </p>
      <p class="add-task-text">Today's Date is {{ date }}</p>
    </div>

    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>

    <div class="add-task-form">
      <div class="input-field">
        <input
          class="input-field-input"
          type="text"
          placeholder="Add a Task Title - Listen to Kendrick Lamar"
          v-model="name"
        />
      </div>

      <div class="input-field">
        <input
          class="input-field-input"
          type="text"
          placeholder="Add a Task Description - Look up Kendrick Lamar's FEAR album on spotify and listen to the whole album."
          v-model="description"
        />
      </div>
      <button @click="errorFunction" class="button">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
//importamos libreria moment.js que previamente habiamos instalado con npm install moment --save
import moment from "moment";

//guardamos en una varibale la funcion predeterminada por moment y lo mostramos en el html con el sintaxis bigotes
const date = moment().format("ll");

const setTask = useTaskStore();

//constante para tendra el valor del title/description imput filed de new task
const name = ref("");
const description = ref("");

//variable a traves de la cual gestionaremos el mostrar/ocultar del mensaje del error
const showErrorMessage = ref(false);

//variable para guardar el mensaje del error
const errorMessage = ref(null);

const emit = defineEmits(["add-task"]);

//arrow function para llamar al formulario que contiene el titulo y description de la task
//donde comprobamos si la variable name y description son vaicas, si es asi mostramos error
//si el usuario ha rellenado los dos campos guardamos los valores en las variables correspondientes y hacemos emit
//al home view con la tarea y borramos los campos con los datos
const errorFunction = () => {
  if (name.value.length === 0 || description.value.length === 0) {
    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is empty";
    setTimeout(() => {
      // errorMessage.value = null;
      showErrorMessage.value = false;
    }, 5000);
  } else {
    const newTask = {
      name: name.value,
      description: description.value,
    };

    emit("add-task", newTask);
    name.value = "";
    description.value = "";
  }
};
</script>

<style scoped>
.add-task-section {
  margin: auto;
  max-width: 1100px;
}

.add-task-section {
  text-align: center;
}

.add-task-title h1 {
  font-size: 60px;
  margin-top: 0;
  padding-top: 30px;
  color: #303134;
}

.add-task-text {
  font-weight: 700;
  color: #303134;
}

.add-task-text:last-child {
  margin-bottom: 40px;
}

.input-field-input {
  margin-bottom: 15px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.add-task-form {
  margin-left: 30px;
  margin-right: 30px;
}

.button {
  font-family: "Barlow", sans-serif;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #44a8ee;
  margin-bottom: 40px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  opacity: 0.8;
  box-shadow: 0 5px #8bc8f2;
}

input[type="text" i] {
  border: 0;
  padding-left: 0;
  padding-right: 0;
}

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.error-text {
  color: red;
}
</style>
