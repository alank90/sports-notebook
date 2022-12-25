<template>
  <h1>NBA standings</h1>
  <ul v-for="(member, index) in nbaTeamStandings" :key="member.position">
    <li>
      {{ index }} - {{ member.team.name }}
      <img :src="member.team.logo" alt="Team Logo" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

const nbaDivisions = ref([
  ["Atlantic", "Southeast", "Central"],
  ["Northwest", "Pacific", "Southwest"],
]);

console.log(nbaDivisions.value[0].length);
let urls = [];
// Populate the urls array with url's of each division for API fetch's
for (let i = 0; i < nbaDivisions.value.length; i++) {
  for (let n = 0; n < nbaDivisions.value[i].length; n++) {
    urls = urls.push(nbaDivisions.value[i][n]);
  }
}
console.log(urls);
let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const urlNBATeamStandings =
  "https://v1.basketball.api-sports.io/standings?league=12&season=2022-2023";

// fetch the NBA team standings
/* fetch(urlNBATeamStandings, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    nbaTeamStandings.value = data.response[0];
    console.log(nbaTeamStandings.value[22].group.name);
  })
  .catch((error) => console.log("Error fetching data ==>", error)); */
</script>

<style scoped>
img[alt="Team Logo"] {
  width: 1rem;
}
</style>
