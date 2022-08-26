<template>

  <div class="container">
    <div class="form-side">
      <div class="header">
        <a href="/auth/#" class="header-logo">
          <img src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8" alt="Logo-ToDo-App">
        </a>
        <div class="header-description">
          <h3 class="header-title">Log In to ToDo App</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <p v-show="errorMsg" class="error-msg"> {{ errorMsg }} </p>

      <form @submit.prevent="signIn" class="form-sign-in">
        <div class="form">
          <div class="form-logo"></div>
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input type="email" class="input-field" placeholder="example@gmail.com" id="email" v-model="email" required>
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input :type="passwordFieldType" class="input-field" placeholder="**********" id="password" v-model="password" required>
            <i class="fas fa-eye-slash fa-sm" @click="changePasswordFieldValue"></i>
          </div>
          <button class="button">Sign In</button>
          <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
          
        </div>
      </form>
      <!-- <button @click="signInGoogle">Entrar con Google</button> -->
      <div class="auth-external">
        <div class="auth-or">OR</div>
        <div class="auth-icon google" @click="signInGoogle">
          <img src="https://freesvg.org/img/1534129544.png" alt="Google Icon">
        </div>

        <div class="auth-icon github" @click="signInGithub">
          <img src="https://img.icons8.com/small/512/github.png" alt="Github Icon">
        </div>
      </div>
    </div>

    <div class="image-side">
      <img src="https://tecnicasdeaprendizaje.net/wp-content/uploads/2020/03/debe-tomar-notas-escribiendo-o-escribiendo.jpg" alt="Notes">
    </div>

  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

const changePasswordFieldValue = () => {
  hidePassword.value = !hidePassword.value;
};

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

const signInGoogle = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().loginWithGoogle();
    // redirects user to the homeView
    setTimeout(redirect.push({ path: "/" }), 4000);
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

const signInGithub = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().loginWithGithub();
    // redirects user to the homeView
    setTimeout(redirect.push({ path: "/" }), 4000);
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

.auth-external{
  position:relative;
  top: 25px;
  left: 20%;
  transform: translate(0, -50%);
}

.auth-or{
  /* position: absolute; */
  /* top: 180px;
  left: 280px;  */
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #DDD;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
}

.auth-icon{
  display: inline-block;
}

.google{
  position: absolute;
  top: 50%;
  left: 70px;
  transform: translate(-50%, -50%);
}

.github{
  position: absolute;
  top: 50%;
  left: 110px;
  transform: translate(-50%, -50%);
}

.auth-icon img{
  max-width: 30px;
  opacity: 0.5
}

.auth-icon img:hover{
  max-width: 30px;
  opacity: 1;
}

.container{
  display: flex;
  justify-content: space-between;
  width: 100vw;
}

.image-side img{
  object-fit: cover;
  width: 50vw;
  height: 100vh;
}

.form-input{
  position: relative;
}

.form-side{
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
  background-color:#44A8EE;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

/* SignIn component */

.header{
  text-align: center;
}

.header img{
  width: 150px;
}

.header-subtitle{
  color: #303134;
}

/* indicamos los estilos para los labels del campo de sign in */
.input-field-label{
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
}

.input-field{
  border-radius: 3px;
  border: 1px solid #195ABD;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
  font-family: 'Barlow', sans-serif;

}

.button{
  padding: 10px 40px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 5px #8BC8F2;
}

a{
  text-decoration: none;
  color: #44A8EE;
  transition: 0.4s;
}

/* damos el color al hover de los enlaces */
.sign-up-link:hover {
  color: #195ABD;
}

.error-msg{
  color: red;
}

.fas{
  color: #303134;
  position: absolute;
  left: 90%;
  bottom: 30%;
  opacity: 0.6;
  transform: translate(-50%, -50%);

}

@media only screen and (max-width: 747px){
  .container{
    display: flex;
    align-items: flex-end;
    background-image: url('https://tecnicasdeaprendizaje.net/wp-content/uploads/2020/03/debe-tomar-notas-escribiendo-o-escribiendo.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0% 0%;
    height: 100vh;
  }

  .image-side{
    display: none;
  }

  .form-side{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    border-radius: 90px 90px 0 0;
  }

  .form-sign-in{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .form-side{
    margin: 0 auto;
  }

  .header{
    display: flex; 
    justify-content: center;
  }

  .header-description{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .fas{
    display: none;
  }

  .auth-external{
  position:relative;
  top: 25px;
  left: 40%;
}

.auth-or{
  /* position: absolute; */
  /* top: 180px;
  left: 280px;  */
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #DDD;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  line-height: 40px;
  text-align: center;
}

}

</style>
