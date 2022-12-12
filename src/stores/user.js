import { defineStore } from "pinia";
import { supabase } from "../supabase";

// tienda user donde accedemos a supabase

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    // hacemos el fetch de todos los usuarios creados
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    // funcion que corresponde al signup, signinm signout y login con otras redes sociales
    // lo propociona la documntacion de supabase
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },

    async loginWithGoogle() {
      const { user, session, error } = await supabase.auth.signIn({
        // provider can be 'github', 'google', 'gitlab', and more
        provider: "google",
      });
    },

    async loginWithGithub() {
      const { user, session, error } = await supabase.auth.signIn({
        // provider can be 'github', 'google', 'gitlab', and more
        provider: "github",
      });
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
