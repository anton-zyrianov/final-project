import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

// las funciones creadas con la ayuda de la documentacion oficial de supabase

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    // hacemos el fetch de las tareas
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },

    // insertamos la nueva tarea a la base de datos correspondiente a un unico usuario
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    // async editTask(title, description, id){
    //   const { data, error } = await supabase.from("tasks").update({
    //     title: title,
    //     description: description,
    //   }).match({
    //     id: id,
    //   });
    // },

    // editamos las tareas ya creadas en la base de datos por medio de update en el caso de que coincidan los ids (los comprobamos con match)
    async editTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          description: description,
        })
        .match({
          id: id,
        });
    },

    // borramos la tarea con el id correspondiente por medio de delete() y match()
    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    // cambiamos el toggle reminder de la tarea que coincida con el id por medio de update() y match()
    async toggleTask(is_complete, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: is_complete,
        })
        .match({
          id: id,
        });
    },
  },
});
