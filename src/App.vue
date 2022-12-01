<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  const appReady = ref(null);
  try {
    //llamamos a fetchuser
    await userStore.fetchUser();
    if (!user.value) {
      //redireccionamos a la pagina del login si el usuario no esta
      appReady.value = true;
      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      // router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Barlow", sans-serif;
}
</style>
