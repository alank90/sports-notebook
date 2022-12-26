<template>
  <h1>NBA standings</h1>
  <!-- <ul v-for="(member, index) in nbaTeamStandings" :key="member.position">
    <li>
      {{ index }} - {{ member.team.name }}
      <img :src="member.team.logo" alt="Team Logo" />
    </li>
  </ul> -->
</template>

<script setup>
import { ref } from "vue";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

const nbaDivisions = ref([
  ["Atlantic", "Southeast", "Central"],
  ["Northwest", "Pacific", "Southwest"],
]);

const nbaTeamStandingsByDivision = ref([]);
console.log(API_KEY);
let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let urls = [];
// Populate the urls array with url's of each division for API fetch's
for (let i = 0; i < nbaDivisions.value.length; i++) {
  for (let n = 0; n < nbaDivisions.value[i].length; n++) {
    urls.push(
      fetch(
        `https://v1.basketball.api-sports.io/standings/?league=12&group=${nbaDivisions.value[i][n]}&season=2022-2023`,
        requestOptions
      )
    );
  }
}
// fetch the NBA team standings
Promise.all(urls)
  .then((values) => console.log(values))
  .catch((error) => console.log("Error fetching data ==>", error));

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
