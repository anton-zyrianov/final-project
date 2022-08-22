<template>
  <div class="container">

    <div class="todo-item">
      <div class="todo-image">
      </div>
      <div class="todo-container">
        <div class="todo-title">Title</div>

        <div class="todo-description">Description</div>

        <div class="todo-buttons">
          <div class="todo-change-state"></div>

          <div class="todo-change-name"></div>

          <div class="todo-delete"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

// const emit = defineEmits([
//   ENTER-EMITS-HERE
// ])

// const props = defineProps(["ENTER-PROP-HERE"]);
</script>

<style scoped>

.todo-item{
  background-color: blue;
  margin-top: 40px;
  height: 100%;
  position: relative;
  width: 33.333%;
}

.todo-image{
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
  left: 50%;
  top: -15%;
  transform: translate(-50%, 0);
}

.todo-container{
  padding: 30px;
  text-align: center;
}

.todo-change-state{
  width: 30px;
  height: 30px;
  background-color: black;
}

.todo-change-name{
  width: 30px;
  height: 30px;
  background-color: green;
}

.todo-delete{
  width: 30px;
  height: 30px;
  background-color: white;
}

.todo-buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.todo-title{
  margin-bottom: 30px;
}

.todo-description{
  margin-bottom: 30px;
}

.container{
  max-width: 1100px;
  margin: auto;
    display: flex;
  flex-wrap: wrap;
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
