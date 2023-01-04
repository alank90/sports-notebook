<template>
  <h1>NBA Results</h1>
  <div v-if="!loading" class="container">
    <table>
      <caption>
        NBA Scoreboard
      </caption>
      <thead>
        <tr>
          <th scope="col" colspan="3">Final</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
          <th>Q4</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in nbaScores.response[0]" :key="team.country.id">
          {{
            team
          }}
          <!-- <th scope="row" colspan="2">
            <img :src="team.teams.away.logo" />{{ team.teams.away.name }}
          </th>
          <td>{{ team.scores.away.quarter_1 }}</td>
          <td>{{ team.scores.away.quarter_2 }}</td>
          <td>{{ team.scores.away.quarter_3 }}</td>
          <td>{{ team.scores.away.quarter_4 }}</td> -->
        </tr>
        <!-- <tr>
          <th scope="row" colspan="2">
            <img :src="team.teams.home.logo" />{{ team.teams.home.name }}
          </th>
          <td>{{ team.scores.home.quarter_1 }}</td>
          <td>{{ team.scores.home.quarter_2 }}</td>
          <td>{{ team.scores.home.quarter_3 }}</td>
          <td>{{ team.scores.home.quarter_4 }}</td>
        </tr> -->
      </tbody>
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
</style>
