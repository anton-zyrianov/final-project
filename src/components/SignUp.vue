<template>
  <div class="container">
    <div class="form-side">
      <div class="header">
        <a href="/auth/#" class="header-logo">
          <img
            src="https://play-lh.googleusercontent.com/PH-2iORSfQs-iizoHzePXBaJCXml443pgoC14-lZESLFIp78A4SvxLKUVv1FyIQFtC8"
            alt="Logo-ToDo-App"
          />
        </a>
        <div class="header-description">
          <h3 class="header-title">Register to ToDo App</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <form @submit.prevent="signUp" class="form-sign-in">
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
            <label class="input-field-label">Password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Confirm password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="button" type="submit">Sign Up</button>
          <p>
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </form>

      <div v-show="errorMsg">{{errorMsg}}</div>
    </div>

    <div class="image-side">
      <img
        src="https://tecnicasdeaprendizaje.net/wp-content/uploads/2020/03/debe-tomar-notas-escribiendo-o-escribiendo.jpg"
        alt="Notes"
      />
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
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Show hide confrimPassword variable
const confirmPasswordFieldType = computed(() =>
  hideConfirmPassword.value ? "password" : "text"
);
const hideConfirmPassword = ref(true);

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style scoped>
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

/* SignUp component */

.header {
  text-align: center;
}

.header img {
  width: 150px;
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
  box-shadow: 0 5px #8BC8F2;
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

}

</style>
