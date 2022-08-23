<template>
  <nav>
    <div class="nav-bar">
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <router-link to="/">
        <img class="navbar-img" src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8" alt="">
      </router-link>

      <div class="log-out">
        <ul class="log-out-elements">
          <li class="hello">
            <p>Welcome <span class="usuario-name">{{emailName[0]}}</span></p>
          </li>
          <li>
            <button @click="signOut" class="button"><span class="button-bold">Log Out</span></button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// constant that saves the user email and cleans out the @client from the user
const emailName = userEmail.split('@');

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    // calls the user store and send the users info to backend to signOut
    await useUserStore().signOut();
    // redirects user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style scoped>

nav{
  max-width: 1100px;
}

.nav-bar{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #303134;
  background-color: #fff;
}

.log-out-elements{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.usuario-name{
  font-weight: 500;
}

.log-out-elements{
  list-style: none;
}

.button{
  background: #44A8EE;
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-left: 50px;
  cursor: pointer;
}

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.button-bold{
  color: #fff;
  font-weight: 700;
}

.navbar-img{
  width: 50px;
}

</style>
