<script setup>
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

let myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);
console.log(`API key is ${myHeaders.get("x-rapidapi-host")}`);

</script>

<template>
  <h1>NBA standings here</h1>
</template>
