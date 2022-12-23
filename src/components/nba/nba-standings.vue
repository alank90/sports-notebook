<template>
  <h1>NBA standings</h1>
  <ul v-for="(member, index) in nbaTeamStandings" :key="member.position">
    <li>{{ index }} - {{ member.team.name }} <img :src="member.team.logo" alt="Team Logo"/></li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

const nbaTeamStandings = ref([]);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);
console.log(`API key is ${myHeaders.get("x-apisports-key")}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const urlNBATeamStandings =
  "https://v1.basketball.api-sports.io/standings?league=12&season=2022-2023";

// fetch the NBA team standings
fetch(urlNBATeamStandings, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    nbaTeamStandings.value = data.response[0];
    console.log(nbaTeamStandings.value[22].group.name);
  })
  .catch((error) => console.log("Error fetching data ==>", error));
</script>


<style scoped>
  img[alt="Team Logo"] {
    width: 1rem;
  }

</style>