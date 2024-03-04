<template>
  <h1>MLB Standings</h1>

  <p>{{ teamMLBGroups }}</p>
</template>

<script setup>
  import { ref, computed, inject } from "vue";
  import { useFetch } from "../modules/useFetch";

  // ========= Variable Declarations =================== //
  const hostName = import.meta.env.VITE_API_HOST_BASEBALL;
  const currentMLBSeason = inject("currentMLBSeason");

  const url =
    "https://v1.baseball.api-sports.io/standings/groups?league=1&season=2023";

  let { apiData: teamMLBGroups, loadingState, error } = useFetch(url, hostName);

  console.log(teamMLBGroups);
</script>

<style scoped>
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
  }
</style>
