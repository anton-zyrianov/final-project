<template>
  <div class="wrapper">
    <Navbar />
    <div :class="played ? 'content-gradient' : 'content'">
      <div class="add-timer-title">
        <h1>Add a new Timer</h1>
      </div>

      <div class="add-timer-description">
        <p class="add-timer-text">Keep your time organized!</p>
        <p class="add-timer-text">
          Today's Time is <span v-text="currentTime"></span>
        </p>
      </div>

      <div class="buttons-set-timer">
        <button class="button" @click="setTimer('pomodoro')">Pomodoro</button>
        <button class="button" @click="setTimer('shortBreak')">
          Short Break
        </button>
        <button class="button" @click="setTimer('longBreak')">
          Long Break
        </button>
      </div>
      <div v-if="!played" class="timer-form">
        <h1 class="timer-display">{{ minutes }} : {{ seconds }}</h1>
      </div>

      <div class="timer-container">
        <div v-if="played" class="timer-counter">
          <h1 class="timer-display">{{ minutes }} : {{ seconds }}</h1>
        </div>
      </div>

      <button v-if="!played" class="button" @click="played = true">
        Start
      </button>
      <button v-if="played" class="button" @click="played = false">
        Pause
      </button>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import buttonSong from "../assets/sounds/music.mp3";
import alertSound from "../assets/sounds/alert.mp3";
import { ref } from "vue";
import moment from "moment";

//const donde podemos guardar el tiempo
const currentTime = ref("");

//funcion para actualizar el tiempo
const updateCurrentTime = () => {
  currentTime.value = moment().format("LTS");
};

//lamamos funcion cada segundo para actulizar el timepo
setInterval(updateCurrentTime, 1000);

//varibales para gestionar sonidos
const btnSong = new Audio(buttonSong);
const alert = new Audio(alertSound);
const played = ref(false);

const minutes = ref(24);
const seconds = ref(59);

//paramos el contador cambiando el estado de la variable played
const stopTimer = () => {
  played.value = false;
  alert.play();
  btnSong.pause();
  clearInterval(timer);
};

//timer que indica la cantidad de minutos y segundos correpsondientes a cada uno de los estados
const setTimer = (type) => {
  if (type === "pomodoro") {
    minutes.value = 24;
    seconds.value = 59;
    stopTimer();
  } else if (type === "shortBreak") {
    minutes.value = 4;
    seconds.value = 59;
    stopTimer();
  } else {
    minutes.value = 14;
    seconds.value = 59;
    stopTimer();
  }
};

//actualizamos el contador por medio de la funcion setInterval cada segundo actualizando los valores de minutos y segundos
const timer = () => {
  if (!(seconds.value === 0 && minutes.value === 0) && played.value) {
    btnSong.play();
    btnSong.loop = true;
    played.value = true;
    seconds.value--;
    if (seconds.value === 0 && minutes.value !== 0) {
      minutes.value--;
      seconds.value = 59;
    }

    if (minutes.value === 0 && seconds.value === 0) {
      played.value = false;
      btnSong.pause();
      alert.play();
      stopTimer();
    }
  }
};

setInterval(timer, 1000);
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-gradient {
  /* background-color: #F3F4F6; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  background: linear-gradient(-45deg, #6d9dc5, #8ac6d0, #b8f3ff, #daf0ee);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

.content {
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
}

.input-field-input {
  margin-bottom: 15px;
  width: 97%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border: 1px;
  display: block;
  text-align: center;
}

.button {
  font-family: "Barlow", sans-serif;
  width: 150px;
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

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.timer-display {
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

.add-timer-title h1 {
  font-size: 60px;
  margin-top: 0;
  padding-top: 30px;
  color: #303134;
}

.add-timer-text {
  font-weight: 700;
  color: #303134;
}

.add-timer-text:last-child {
  margin-bottom: 40px;
}

.buttons-set-timer {
  display: flex;
  flex-direction: row;
  gap: 75px;
  justify-content: center;
}
</style>
