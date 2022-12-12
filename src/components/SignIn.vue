<template>
  <div class="container">
    <div class="form-side">
      <div class="header">
        <a href="/auth/#" class="header-logo">
          <img src="../assets/img/logo-big.png" alt="Logo-ToDo-App" />
        </a>
        <div class="header-description">
          <h3 class="header-title">Log In to ToDo App</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <!-- mostramos el error si la variable errorMsg es true -->
      <p v-show="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <!-- form que corresponde a los dos inputs de email y password -->
      <form @submit.prevent="signIn" class="form-sign-in">
        <div class="form">
          <div class="form-logo"></div>
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input
              type="email"
              class="input-field"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-input">
            <!-- segun la variable hidepassword indicamos el tipo al input, si es true se muestra como password con asteriscos
            y si es false, como texto 
            ademas, en funcion de la misma variable mostramos un icono u otro que nos indica que la contraseña se esta mostrando
            o no -->
            <label class="input-field-label">Password</label>
            <input
              :type="passwordFieldType"
              class="input-field"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
            <i
              v-if="hidePassword"
              class="fas fa-eye-slash fa-sm"
              @click="changePasswordFieldValue"
            ></i>
            <i
              v-if="!hidePassword"
              class="fas fa-eye fa-sm"
              @click="changePasswordFieldValue"
            ></i>
          </div>
          <button class="button">Sign In</button>
          <p>
            Dont have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </form>
      <div class="auth-external">
        <div class="auth-or">OR</div>
        <div class="auth-icon google" @click="signInGoogle">
          <img src="https://freesvg.org/img/1534129544.png" alt="Google Icon" />
        </div>

        <div class="auth-icon github" @click="signInGithub">
          <img
            src="https://img.icons8.com/small/512/github.png"
            alt="Github Icon"
          />
        </div>
      </div>
    </div>

    <div class="image-side">
      <img
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="Notes"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

//variables de rutas
const route = "/auth/sign-up";
const buttonText = "Sign Up";

//input fields
const email = ref("");
const password = ref("");

//error message
const errorMsg = ref("");

//mostrar/ocultar contraseña
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const changePasswordFieldValue = () => {
  hidePassword.value = !hidePassword.value;
};

//router para empujar al usuario una vez hecho SignIn
const redirect = useRouter();

//arrow function para signIn del usuario a supabase
const signIn = async () => {
  try {
    //llamamos la tienda user y enviamos informacion al backend para hacer logIn
    await useUserStore().signIn(email.value, password.value);
    //redirect a la home view
    redirect.push({ path: "/" });
  } catch (error) {
    //mostramos mensaje del error
    errorMsg.value = `Error: ${error.message}`;
    //ocultamos el error a los 5 segundos
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

//funcion para hacer el signIn con plataformas externas google/github
const signInGoogle = async () => {
  try {
    //llamamos la tienda user y enviamos informacion al backend para hacer logIn
    await useUserStore().loginWithGoogle();
    //redirect a la home view
    // setTimeout(redirect.push({ path: "/" }), 5000);
  } catch (error) {
    //mostramos mensaje del error
    errorMsg.value = `Error: ${error.message}`;
    //ocultamos el error a los 5 segundos
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

const signInGithub = async () => {
  try {
    //llamamos la tienda user y enviamos informacion al backend para hacer logIn
    await useUserStore().loginWithGithub();
    //redirect a la home view
    // setTimeout(redirect.push({ path: "/" }), 5000);
  } catch (error) {
    //mostramos mensaje del error
    errorMsg.value = `Error: ${error.message}`;
    //ocultamos el error a los 5 segundos
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style scoped>
.auth-external {
  position: relative;
  top: 25px;
  left: 20%;
  transform: translate(0, -50%);
}

.auth-or {
  /* position: absolute; */
  /* top: 180px;
  left: 280px;  */
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #ddd;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
}

.auth-icon {
  display: inline-block;
}

.google {
  position: absolute;
  top: 50%;
  left: 70px;
  transform: translate(-50%, -50%);
}

.github {
  position: absolute;
  top: 50%;
  left: 110px;
  transform: translate(-50%, -50%);
}

.auth-icon img {
  max-width: 30px;
  opacity: 0.5;
}

.auth-icon img:hover {
  max-width: 30px;
  opacity: 1;
}

.container {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}

.image-side img {
  object-fit: cover;
  width: 50vw;
  height: 100vh;
}

.form-input {
  position: relative;
}

.form-side {
  margin: auto;
  max-width: 747px;
}

/* .form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
} */
.button {
  background-color: #44a8ee;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

/* SignIn component */

.header {
  text-align: center;
}

.header-subtitle {
  color: #303134;
}

/* indicamos los estilos para los labels del campo de sign in */
.input-field-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
}

.input-field {
  border-radius: 3px;
  border: 1px solid #195abd;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
  font-family: "Barlow", sans-serif;
}

.button {
  padding: 10px 40px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 5px #8bc8f2;
}

a {
  text-decoration: none;
  color: #44a8ee;
  transition: 0.4s;
}

/* damos el color al hover de los enlaces */
.sign-up-link:hover {
  color: #195abd;
}

.error-msg {
  color: red;
}

.fas {
  color: #303134;
  position: absolute;
  left: 90%;
  bottom: 30%;
  opacity: 0.6;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 747px) {
  .container {
    display: flex;
    align-items: flex-end;
    background-image: url("https://tecnicasdeaprendizaje.net/wp-content/uploads/2020/03/debe-tomar-notas-escribiendo-o-escribiendo.jpg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0% 0%;
    height: 100vh;
  }

  .image-side {
    display: none;
  }

  .form-side {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    border-radius: 90px 90px 0 0;
  }

  .form-sign-in {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .form-side {
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: center;
  }

  .header-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .fas {
    display: none;
  }

  .auth-external {
    position: relative;
    top: 25px;
    left: 40%;
  }

  .auth-or {
    /* position: absolute; */
    /* top: 180px;
  left: 280px;  */
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #ddd;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 40px;
    text-align: center;
  }
}
</style>
