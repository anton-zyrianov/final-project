<template>
  <div class="container">

    <!-- <div class="no-task-container" v-if="tasks.lenght === 0">
      <p >Woohoo, nothing left to do!</p>
    </div> -->

    <div class="todo-item animate__animated animate__fadeInRight" v-for="(task, index) in tasks" :key="index">
      <div :class="task.is_complete ? 'todo-image' : 'todo-image-not'">
        <i v-if="task.is_complete" class="task fas fa-check fa-lg"></i>
        <i v-if="!task.is_complete" class="task fas fa-times fa-lg"></i>
      </div>

      <div class="todo-container">
        <div class="todo-title">
          <h3 :class="task.is_complete ? 'done' : ''">{{ task.title }}</h3>
        </div>

        <div class="todo-description">
          <p :class="task.is_complete ? 'done' : ''">{{ task.description }}</p>
        </div>

        <div class="todo-buttons">
          <div :class="task.is_complete ? 'todo-change-state' : 'todo-change-state-not'" @click="toggleReminderTask(task.id, index)"></div>

          <div class="todo-change-name">
            <i class="change fas fa-edit fa-lg" @click="changeNameActiveValue(task)"></i>
          </div>

          <div class="todo-delete">
            <i class="change fas fa-ban fa-lg" @click="deleteTask(task.id)"></i>
          </div>
        </div>

        <div class="changeName" v-if="changeNameActive && idRef === task.id">
          <!-- @click="changeName(task.id, index)" -->
          <div class="add-task-form">
            <div class="input-field">
              <input class="input-field-input" type="text" placeholder="Edit title" v-model="name">
            </div>

            <div class="input-field">
              <input class="input-field-input" type="text" placeholder="Edit description" v-model="description">
            </div>

            <!-- <button @click.prevent="errorFunction" class="button">Add</button> -->
            <button @click="changeNameTask(task.id, index)" class="button">Change</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-reminder', 'delete-task', 'change-name']);

const props = defineProps({
  tasks: Array,
});

//variables donde guardaremos las valores de nuestro formulario donde queremos cambiar los valores de title y
//description 
const name = ref('');
const description = ref('');

//variable que nos guarda un valor booleano para poder aplciar onClick y con la funcion changeNameActiveValue poder
//cambiar su valor y abrir el formulario donde vamos a cambiar los valores
const changeNameActive = ref(false);
const idRef = ref(null);

//pasamos index a la funcion, porque taskToToggle es un array de objetos y queremos obtener el objeto en el que hemos alterado el valor is_complete
//para eso pasamos el index del v-for para obtener la posision de este objeto en el array y emitirlo como custom event a la home
const toggleReminderTask = (id, index) => {

  //tenemos que comparar task.id porque cada tarea tiene su id individual y es lo que queremos comparar en el map para poder alterar el valor de is_complete
  //is_complete es una variable del objeto task y lo que queremos es darle el valor opuesto a su valor inicial
  const taskToToggle = props.tasks.map((task) =>
  task.id === id ? {...task, is_complete: !task.is_complete} : task
  );

  emit('toggle-reminder', taskToToggle[index]);

};

const deleteTask = (id) => {

  const taskToDelete = props.tasks.filter((task) => task.id === id);
  emit('delete-task', taskToDelete[0]);


};

const changeNameActiveValue = (task) => {
  idRef.value = task.id;
  changeNameActive.value = !changeNameActive.value;
  name.value = task.title;
  description.value = task.description;

};

const changeNameTask = (id, index) => {

  const taskToEdit = props.tasks.map((task) => 
  task.id === id ? {...task, title: name.value, description: description.value} : task
  );
  emit('change-name', taskToEdit[index]);

  name.value = "";
  description.value = "";
  changeNameActive.value = false;

};

</script>

<style scoped>

/* .container{
  display: flex;
} */

.todo-item{
  margin-top: 40px;
  height: 100%;
  position: relative;
  width: 33.333%;
  display: flex;
  flex-direction: column;

}

.todo-image{
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #8fbc91;
  left: 50%;
  top: -35px;
  transform: translate(-50%, 0);
  border: 7px solid #fff;
}

.todo-image-not{
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #EF6969;
  left: 50%;
  top: -35px;
  transform: translate(-50%, 0);
  border: 7px solid #fff;
}

.todo-container{
  padding: 30px;
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 40px;
  color: #303134;
  border-radius: 10px;
}

.todo-change-state{
  width: 40px;
  height: 40px;
  background-color: #8fbc91;
}

.todo-change-state-not{
  width: 40px;
  height: 40px;
  background-color: #EF6969;
}

.todo-change-name{
  width: 40px;
  height: 40px;
  background-color: #64babe;
}

.todo-delete{
  width: 40px;
  height: 40px;
  background-color: #fdafab;
}

.todo-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.todo-title{
  margin-bottom: 30px;
}

.todo-title h3{
  word-break: break-all;
}

.todo-description{
  margin-bottom: 30px;
}

.todo-description p{
  word-break: break-all;
}

.container{
  max-width: 1100px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.task{
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.todo-change-state,
.todo-change-state-not,
.todo-change-name,
.todo-delete{
  position: relative;
  border-radius: 6px;
  opacity: 0.5;
  cursor: pointer;
}

.todo-change-state:hover,
.todo-change-state-not:hover,
.todo-change-name:hover,
.todo-delete:hover{
  opacity: 1;
}

.change{
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.changeName{
  margin-top: 20px;
}

.input-field-input{
  margin-bottom: 15px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
}

/* .add-task-form{
  padding: 0 100px;
} */

.button{
  font-family: 'Barlow', sans-serif;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #44A8EE;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
}

input[type="text" i]{
  border: 0;
  padding-left: 0;
  padding-right: 0;
  box-shadow: 0 1px 8px rgba(48, 49, 52, 0.3);;
}

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.done{
  text-decoration:line-through;
}

.no-task-text{
  color: #303134;
  font-size: 25px;
}

@media only screen and (max-width: 747px){
  .container{
    margin-left: 30px;
    margin-right: 30px;

  }

  .todo-item{
    width: 50%;
    margin-left: 0px;
    margin-right: 0px;
  }
}

@media only screen and (max-width: 540px){
  .todo-item{
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
}

</style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
