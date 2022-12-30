<template>
  <h1>NBA Standings</h1>
  <h2>Eastern Conference</h2>
  <table v-if="nbaTeamStandingsByDivision">
    <template v-for="item in nbaTeamStandingsByDivision">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <thead>
        <tr>
          <th scope="col" colspan="2">{{ item.parameters.group }}</th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">PCT</th>
        </tr>
      </thead>
      <tbody v-for="(team, index) in item.response[0]" :key="index">
        <tr>
          <th scope="row" colspan="2">{{ team.team.name }}</th>
          <td>{{ team.games.win.total }}</td>
          <td>{{ team.games.lose.total }}</td>
          <td>{{ team.games.win.percentage }}</td>
        </tr>
      </tbody>
    </template>
  </table>
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
      ).then((res) => res.json())
    );
  }
}

// fetch the NBA team standings
Promise.all(urls)
  .then((data) => {
    nbaTeamStandingsByDivision.value = data;
  })
  .catch((error) => console.log("Error fetching data ==>", error));
</script>

<style scoped>
img[alt="Team Logo"] {
  width: 1rem;
}

table {
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
}

caption {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  color: #333;
  margin-bottom: 16px;
}

thead {
  background-color: #333;
  color: white;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
}

thead th {
  width: 25;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #eee;
}

tbody th {
  background-color: #36c;
  color: #fff;
  text-align: left;
}

tbody tr:nth-child(even) th {
  background-color: #25c;
}
</style>
