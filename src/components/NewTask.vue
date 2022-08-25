<template>
  <div class="add-task-section">
    <div class="add-task-title">
      <h1>Add a new Task</h1>
    </div>

    <div class="add-task-description">
      <p class="add-task-text">Keep your life organized, prepare for a trip ? Start here</p>
      <p class="add-task-text">Today's Date is {{ date }}</p>
    </div>


    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>

    <div class="add-task-form">
      <div class="input-field">
        <input class="input-field-input" type="text" placeholder="Add a Task Title - Listen to Kendrick Lamar" v-model="name">
      </div>

      <div class="input-field">
        <input class="input-field-input" type="text" placeholder="Add a Task Description - Look up Kendrick Lamar's FEAR album on spotify and listen to the whole album." v-model="description">
      </div>

      <!-- <button @click.prevent="errorFunction" class="button">Add</button> -->
      <button @click="errorFunction" class="button">Add</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task" 
//importamos libreria moment.js que previamente habiamos instalado con npm install moment --save
import moment from 'moment'

//guardamos en un varibale la funcion predeterminada por moment y lo mostramos en el html con el sintaxis bigotes
const date = moment().format('ll');;   

// constant to save a variable that define the custom event that will be emitted to the homeView
const setTask = useTaskStore();

// constant to save a variable that holds the value of the title input field of the new task
const name = ref('');

// constant to save a variable that holds the value of the description input field of the new task
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is 
//conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const emit = defineEmits(['add-task']);

// arrow function to call the form holding the task title and task description that uses a conditional to first 
//checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets 
//a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task 
//title and task description; clears the task title and task description input fields.
const errorFunction = () => {
  if(name.value.length === 0 || description.value.length === 0){
    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
      // errorMessage.value = null;
      showErrorMessage.value = false;
    }, 5000);
  } else {
    const newTask = {
      name: name.value,
      description: description.value,
    };

    // console.log(newTask);

    emit("add-task", newTask);
    name.value = '';
    description.value = '';

    // setTask.addTask(name.value, description.value);
    // name.value = '';
    // description.value = '';
  }
};

</script>

<style scoped>

.add-task-section{
  margin: auto;
  max-width: 1100px;
}

.add-task-section{
  text-align: center;
}

.add-task-title h1{
  font-size: 60px;
  margin-top: 0;
  padding-top: 30px;
  color: #303134;
}

.add-task-text{
  font-weight: 700;
  color: #303134;
}

.add-task-text:last-child{
  margin-bottom: 40px;
}

.input-field-input{
  margin-bottom: 15px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}

.add-task-form{
  margin-left: 30px;
  margin-right: 30px;
}

.button{
  font-family: 'Barlow', sans-serif;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #44A8EE;
  margin-bottom: 40px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  opacity: 0.8;
  box-shadow: 0 5px #8BC8F2;
}

input[type="text" i]{
  border: 0;
  padding-left: 0;
  padding-right: 0;
}

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.error-text{
  color: red;
}


</style>
