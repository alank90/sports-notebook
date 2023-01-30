<template>
  <h1>NBA Results</h1>
  <div v-if="!loading" class="container">
    <h2>NBA Scoreboard</h2>
    <table>
      <template v-for="team in nbaScores.response">
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <thead v-if="(team.status.short = 'FT' || 'AOT')">
          <tr>
            <th scope="row" colspan="2">{{ team.status.short }}</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
            <th scope="col" colspan="3">Final</th>
          </tr>
        </thead>
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <tbody v-if="(team.status.short = 'FT' || 'AOT')">
          <tr>
            <td scope="row" colspan="2">
              <img :src="team.teams.away.logo" />{{ team.teams.away.name }}
            </td>
            <td>{{ team.scores.away.quarter_1 }}</td>
            <td>{{ team.scores.away.quarter_2 }}</td>
            <td>{{ team.scores.away.quarter_3 }}</td>
            <td>{{ team.scores.away.quarter_4 }}</td>
            <td>{{ team.scores.away.total }}</td>
          </tr>
          <tr>
            <td scope="row" colspan="2">
              <img :src="team.teams.home.logo" />{{ team.teams.home.name }}
            </td>
            <td>{{ team.scores.home.quarter_1 }}</td>
            <td>{{ team.scores.home.quarter_2 }}</td>
            <td>{{ team.scores.home.quarter_3 }}</td>
            <td>{{ team.scores.home.quarter_4 }}</td>
            <td>{{ team.scores.home.total }}</td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
  <div v-else>
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;
let loading = ref(true);

const nbaScores = ref([]);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// Fetch scores
fetch(
  `https://v1.basketball.api-sports.io/games/?league=12&season=2022-2023&date=2023-01-03`,
  requestOptions
)
  .then((res) => res.json())
  .then((data) => {
    nbaScores.value = data;
    loading.value = false;
  });
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

table {
  border-collapse: collapse;
  border-spacing: 5px;
  table-layout: auto;
  width: 40vw;
  max-width: 950px;
  margin: 20px auto 75px;
  border: 3px solid #000;
}

thead {
  border-top: 4px solid #000;
}

th,
td {
  max-width: 10%;
  text-align: center;
  vertical-align: bottom;
  border-collapse: collapse;
  padding: 0.3em;
  font-weight: 500;
  font-size: 1.1rem;
  caption-side: bottom;
}

tr {
  border: 1px solid #000;
  height: 35px;
}

td:first-child,
th:first-child {
  text-align: left;
  vertical-align: middle;
}

td {
  height: 25px;
}
td:last-child {
  font-weight: 550;
}

caption {
  padding: 0.3em;
  color: #fff;
  background: #000;
}

th {
  background: #eee;
}

img {
  max-width: 24px;
  max-height: 24px;
}
</style>
