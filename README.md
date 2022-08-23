# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance. 

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web. 

## Important
This app is not setUp to be deployed to a production environment like vercel or netlify. 

Friday on August 19 we will look at how can we deploy this app to Vercels ecosystem.


## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY 
```
#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Good Music is always key!

```sh
Wu Tang Clan
A tribe called quest
Kendrick Lamar
Outkast
Dr. Dre
N.W.A
De La Soul 
Ms. Lauryn Hill
J. Cole 
Guts
Naughty By Nature
People under the stairs
Nujabes
NAS
KRS-One
The Pharcyde
Jurassic 5
Gang starr
Jay Z
Mobb Depp
Common
Lil Supa
```
[Hip Hop Spotify Playlist](https://open.spotify.com/playlist/4vKftyhS1gQovakehVcq1u?si=a7a119382dfe40da)

18 agosto:
- implentar HTML y CSS del sign-up y sing-in

19 agosto:
- implentar la logica para sign-up, sign-in y sing out
- implentar el navbar y el footer
- empezar con el diseño HTML y CSS de addTask

22 de agosto:
- implementar la funcionalidad de addTask y TaskItem
- añadir el diseño HTML y CSS de TaskItem
- hacer el fetch de las task de supabase
- !falta por arreglar que las task aparezcan sin actualizar la pagina

23 de agosto:
- preparar las tienda task para poder conectar los botones con la base de datos
- añadir funcionalidad a los botones toggle - change name - delete de cada tarea
- implemntado la funcionalidad de ocultar/mostrar contraseña en el sign in
