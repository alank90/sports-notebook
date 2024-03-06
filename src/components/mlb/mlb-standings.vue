<template>
  <h1>MLB Standings</h1>

  <p>{{ teamStandings }}</p>
</template>

<script setup>
  import { ref, computed, inject } from "vue";
  import { useFetch } from "../modules/useFetch";

  // ========= Variable Declarations =================== //
  const hostName = import.meta.env.VITE_API_HOST_BASEBALL;
  const currentMLBSeason = inject("currentMLBSeason");
  const stagesValue = "MLB - Pre-season";
  const urlGroups =
    "https://v1.baseball.api-sports.io/standings/groups?league=1&season=2023";
  const urlStandings = `https://v1.baseball.api-sports.io/standings/group=AL East?league=1&season=2020`;

  // ------------ Fetch the data from the endpoint -------------- //
  /* let {
    data: teamMLBGroups,
    loadingState,
    error,
  } = useFetch(urlGroups, hostName); */
  let {
    data: teamStandings,
    loadingState,
    error,
  } = useFetch(urlStandings, hostName);
  // -------------- End fetches --------------------------------- //
</script>

<style scoped>
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
  }
</style>
