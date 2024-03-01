<template>
  <h1>MLB Standings</h1>
</template>

<script setup>
  import { ref, computed, inject } from "vue";

  // ========= Variable Declarations =================== //
  const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST;
  const currentNBASeason = inject("currentNBASeason");

  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  myHeaders.append("x-rapidapi-host", HOST_NAME);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };



  
</script>

<style scoped>
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
  }
</style>
