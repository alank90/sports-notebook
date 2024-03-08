<template>
  <h1>MLB Standings</h1>

  <p>{{ teamStandings }}</p>
</template>

<script setup>
  import { inject } from "vue";
  import { useFetches } from "../modules/useFetches";

  // ========= Variable Declarations =================== //
  const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST_BASEBALL;
  let myHeaders = new Headers();
  myHeaders.append("x-apisports-key", API_KEY);
  myHeaders.append("x-rapidapi-host", HOST_NAME);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const currentMLBSeason = inject("currentMLBSeason");
  let urls = [];

  const baseballGroups = ["Cactus", "Grapefruit"];

  // ---------- Create fetch array for the Baseball groups( Cactus, Grapefruit) ---------- //
  baseballGroups.forEach((group) => {
    urls.push(
      fetch(
        `https://v1.baseball.api-sports.io/standings/?group=${group}&league=1&season=2024`,
        requestOptions
      ).then((res) => res.json())
    );
  });
  // ------------ Fetch the data from the endpoint -------------- //
  /* let {
      data: teamMLBGroups,
      loadingState,
      error,
    } = useFetch(urlGroups, hostName);
    let {
      data: teamStandings,
      loadingState,
      error,
    } = useFetch(urlStandings, hostName); */
  // -------------- End fetches --------------------------------- //
</script>

<style scoped>
  h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
  }
</style>
