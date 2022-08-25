<template>
   <div class="wrapper">
      <Navbar />
         <div :class="played ? 'content-gradient' : 'content'">

            <div class="add-timer-title">
               <h1>Add a new Timer</h1>
            </div>

            <div class="add-timer-description">
               <p class="add-timer-text">Keep your time organized!</p>
               <p class="add-timer-text">Today's Time is {{ time }}</p>
            </div>

            <div v-if="!played" class="timer-form">
               <input class="input-field-input" type="number" placeholder="Minutes" id="minutes" v-model="minutes" required>
               <input class="input-field-input" type="number" placeholder="Seconds" id="seconds" v-model="seconds" required>
            </div>

            <div class="timer-container">
               <div v-if="played" class="timer-counter">
                  <h1 class="timer-display">{{ minutes }} : {{ seconds }}</h1>
               </div>
            </div>

            <button v-if="!played" class="button" @click="timer">Start</button>
            <button v-if="played" class="button" @click="restart">Restart</button>
         </div>

      <Footer />
   </div>
</template>

<script setup>
import Navbar from "../components/Nav.vue"
import Footer from "../components/Footer.vue"
import buttonSong from "../assets/sounds/music.mp3"
import alertSound from "../assets/sounds/alert.mp3"
import { ref } from "vue"
import moment from 'moment'

const time = moment().format('LTS');

const btnSong = new Audio(buttonSong);
const alert = new Audio(alertSound);
const played = ref(false);

const minutes = ref("");
const seconds = ref("");

const timer = () => {
   setInterval(() => {
   if(seconds.value > 0){
      btnSong.play();
      btnSong.loop = true;
      played.value = true;
      seconds.value--;
      if(seconds.value === 0 && minutes.value != 0){
         minutes.value--;
         seconds.value = 59;
      }

      if(minutes.value === 0 && seconds.value === 0){
         clearInterval(timer);
         played.value = false;
         btnSong.pause();
         alert.play();
      }
   };
}, 1000);
};

const restart = () => {
   minutes.value = "";
   seconds.value = "";

   played.value = false;
   alert.play();
   btnSong.pause();

   clearInterval(timer);
}

</script>

<style scoped>

.wrapper{
   min-height: 100vh;
   overflow: hidden;
   display: flex;
   flex-direction: column;
}

.content-gradient{
   /* background-color: #F3F4F6; */
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   flex: 1 1 auto;
   background: linear-gradient(-45deg, #6D9DC5, #8AC6D0, #B8F3FF, #DAF0EE);
   background-size: 400% 400%;
   animation: gradient 10s ease infinite;
}

.content{
   background-color: #F3F4F6;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   flex: 1 1 auto;
}

.input-field-input{
   margin-bottom: 15px;
   width: 97%;
   padding-top: 10px;
   padding-bottom: 10px;
   border-radius: 5px;
   border: 1px;
   display: block;
   text-align: center;
}

.button{
   font-family: 'Barlow', sans-serif;
   width: 150px;
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

.button:hover {
   color: rgba(255, 255, 255, 1) !important;
   box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
   transition: all 0.2s ease;
}

.timer-display{
   font-size: 90px;
   color: #303134;
}

@keyframes gradient {
   0% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
   100% {
      background-position: 0% 50%;
   }
}

.add-timer-title h1{
   font-size: 60px;
   margin-top: 0;
   padding-top: 30px;
   color: #303134;
}

.add-timer-text{
   font-weight: 700;
   color: #303134;
}

.add-timer-text:last-child{
   margin-bottom: 40px;
}

</style>