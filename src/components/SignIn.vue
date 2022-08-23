<template>

  <div class="container">
    <div class="form-side">
      <div class="header">
        <a href="/auth/#" class="header-logo">
          <img src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8" alt="Logo-ToDo-App">
        </a>
        <h3 class="header-title">Log In to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
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
</script>

<style scoped>

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
  left: 30.5%;
  bottom: 31%;
  opacity: 0.6;

}

</style>
