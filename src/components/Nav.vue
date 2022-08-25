<template>
  <nav>
    <div class="nav-bar">
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <router-link to="/">
        <img class="navbar-img" src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8" alt="">
      </router-link>

      <ul class="log-out-elements navbar">
          <li>
            <router-link to="/">Task Manager</router-link>
          </li>

          <li>
            <router-link to="/timer">Timer</router-link>
          </li>
      </ul>

      <div class="log-out">
        <ul class="log-out-elements">

          <li class="log-out-welcome">
            <p>Welcome <span class="usuario-name">{{emailName[0]}}</span></p>
          </li>

          <li>
            <button @click="signOut" class="button"><span class="button-bold">Log Out</span></button>
          </li>
        </ul>

        <button @click="changeClickBurger" :class="[clickBurger ? 'active' : '', 'button-menu']" id="button-menu">
          <span class="span-uno"></span>
          <span class="span-dos"></span>
          <span class="span-tres"></span>
        </button>
        <nav :class="[clickBurger ? 'active' : '','nav-burger']" id="nav-burger">
        <ul class="log-out-elements-mobile navbar">
          <li>
            <router-link to="/">Task Manager</router-link>
          </li>

          <li>
            <router-link to="/timer">Timer</router-link>
          </li>

          <li>
            <button @click="signOut" class="button"><span class="button-bold">Log Out</span></button>
          </li>
        </ul>
        </nav>
      </div>

    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

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

const clickBurger = ref(false);

const changeClickBurger = () => {
  clickBurger.value = !clickBurger.value;
};
</script>

<style scoped>

.navbar li{
  margin-left: 50px;
  margin-right: 50px;
}

.nav-bar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #303134;
  background-color: #fff;
  margin: 0 10%;
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
  opacity: 0.8;
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

.log-out-elements-mobile{
  display: none;
}

.button-menu{
  display: none;
}

.navbar{
  position: relative;
}

.navbar a{
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #44A8EE;
  text-decoration: none;
  opacity: 0.6;
  font-weight: 600;
  align-items: center;
}

.navbar a:hover{
  color: #195ABD;
  opacity: 0.9;
}

@media only screen and (max-width: 747px){
  .log-out-welcome{
    display: none;
  }

  .log-out-elements{
    display: none;
  }

  .nav-bar{
    margin: 0 50px;
    justify-content: space-between;
  }

  .log-out-elements-mobile{
    display: flex;
    list-style: none;
    justify-content: space-between;
    margin-right: 50px;
  }
  
  .button-menu{
    display: block;
  }

  .nav-burger{
    background-color: #fff;
    position: absolute;
    left: 0;
    top: -100%;
    width: 100%;
    margin-top: 40px;
    z-index: 50;
    transition: all 0.3s ease 0s;
  }

  .nav-burger.active{
    top: 14px;
  }

  .button-menu {
    width: 40px;
    height: 40px;
    border: none;
    display: flex;
    background: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .button-menu span{
    width: 30px;
    height: 4px;
    background-color: #44A8EE;
    margin-bottom: 5px;
    position: relative;
    transition: all 0.3s ease 0s;
  }

  .button-menu.active .span-uno{
    transform: rotate(45deg);
    top: 5px;
  }

  .button-menu.active .span-dos{
    display: none;
  }
  
  .button-menu.active .span-tres{
    transform: rotate(-45deg);
    bottom: 5px;
  }

}

</style>
