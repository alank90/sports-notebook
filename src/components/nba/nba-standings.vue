<template>
  <h1>NBA standings</h1>
</template>

<script setup>
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

const teamInfo = ref([]);
const teamStandings = ref([]);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);
console.log(`API key is ${myHeaders.get("x-apisports-key")}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const urlTeamStandings =
  "https://v1.basketball.api-sports.io/standings?league=12&season=2022-2023";

// fetch the NBA team standings
fetch(urlTeamStandings, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    teamInfo.value = data.response[0];
    console.log(teamInfo.value[22].group.name);
  })
  .catch((error) => console.log("Error fetching data ==>", error));
</script>
