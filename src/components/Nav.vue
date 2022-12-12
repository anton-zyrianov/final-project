<template>
  <nav>
    <div class="nav-bar">
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <router-link to="/">
        <img
          class="navbar-img animate__animated animate__bounceIn"
          src="../assets/img/logo-small.png"
          alt="Logo"
        />
      </router-link>

      <ul class="log-out-elements navbar animate__animated animate__bounceIn">
        <li>
          <router-link to="/">Task Manager</router-link>
        </li>

        <li>
          <router-link to="/timer">Timer</router-link>
        </li>
      </ul>

      <div class="log-out">
        <ul class="log-out-elements animate__animated animate__bounceIn">
          <li class="log-out-welcome">
            <p>
              Welcome <span class="usuario-name">{{ emailName[0] }}</span>
            </p>
          </li>

          <li>
            <button @click="signOut" class="button">
              <span class="button-bold">Log Out</span>
            </button>
          </li>
        </ul>
        <!-- burger menu donde el icono se ha hecho con 3 spans, y al clicar en el icono el span del medio desaparece
        y se añade la animacion donde las dos rayas que quedan se ponen en cruz para representar el icono cerrar. 
        cuando se ha hecho click en el icono se añade la clase active al nav-burger que coloca el menu con las opciones
        en la posicion correspondiente-->
        <button
          @click="changeClickBurger"
          :class="[clickBurger ? 'active' : '', 'button-menu']"
          id="button-menu"
        >
          <span class="span-uno"></span>
          <span class="span-dos"></span>
          <span class="span-tres"></span>
        </button>
        <nav
          :class="[clickBurger ? 'active' : '', 'nav-burger']"
          id="nav-burger"
        >
          <ul class="log-out-elements-mobile navbar">
            <li>
              <router-link to="/">Task Manager</router-link>
            </li>

            <li>
              <router-link to="/timer">Timer</router-link>
            </li>

            <li>
              <button @click="signOut" class="button">
                <span class="button-bold">Log Out</span>
              </button>
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
import { ref } from "vue";

const route = "/";
const buttonText = "Todo app";

//constante para guardar a los usuario desde la tienda
const getUser = useUserStore().user;

//constante que llama user email desde useUserStore
const userEmail = getUser.email;

//constante que guarda el email limpia @client del usuario
const emailName = userEmail.split("@");

//funcion asicnrona que llama metodo signOut desde la tienda useUserStore y empuja al usuario hacia Auth view
const redirect = useRouter();

const signOut = async () => {
  try {
    //llamamos la tienda y enviamos al usuario al backendo para el signOut
    await useUserStore().signOut();
    //redirect del usuario al Auth view
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    //mostramos el error message
    errorMsg.value = `Error: ${error.message}`;
    //ocultamos el errror
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

const clickBurger = ref(false);

//cambiamos el valor de la variable para gestionar burger menu
const changeClickBurger = () => {
  clickBurger.value = !clickBurger.value;
};
</script>

<style scoped>
.navbar li {
  margin-left: 50px;
  margin-right: 50px;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #303134;
  background-color: #fff;
  margin: 0 10%;
}

.log-out-elements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.usuario-name {
  font-weight: 500;
}

.log-out-elements {
  list-style: none;
}

.button {
  background: #44a8ee;
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-left: 50px;
  cursor: pointer;
  opacity: 0.8;
  box-shadow: 0 5px #8bc8f2;
}

.button:hover {
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 2px 8px rgba(49, 138, 172, 1);
  transition: all 0.2s ease;
}

.button-bold {
  color: #fff;
  font-weight: 700;
}

.navbar-img {
  width: 50px;
}

.log-out-elements-mobile {
  display: none;
}

.button-menu {
  display: none;
}

.navbar {
  position: relative;
}

.navbar a {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #44a8ee;
  text-decoration: none;
  opacity: 0.6;
  font-weight: 600;
  align-items: center;
}

.navbar a:hover {
  color: #195abd;
  opacity: 0.9;
}

@media only screen and (max-width: 747px) {
  .log-out-welcome {
    display: none;
  }

  .log-out-elements {
    display: none;
  }

  .nav-bar {
    margin: 0 50px;
    justify-content: space-between;
  }

  .log-out-elements-mobile {
    display: flex;
    list-style: none;
    justify-content: space-between;
    margin-right: 50px;
  }

  .button-menu {
    display: block;
  }

  .nav-burger {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: -100%;
    width: 100%;
    margin-top: 40px;
    z-index: 50;
    transition: all 0.3s ease 0s;
  }

  .nav-burger.active {
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

  .button-menu span {
    width: 30px;
    height: 4px;
    background-color: #44a8ee;
    margin-bottom: 5px;
    position: relative;
    transition: all 0.3s ease 0s;
  }

  .button-menu.active .span-uno {
    transform: rotate(45deg);
    top: 5px;
  }

  .button-menu.active .span-dos {
    display: none;
  }

  .button-menu.active .span-tres {
    transform: rotate(-45deg);
    bottom: 5px;
  }
}
</style>
