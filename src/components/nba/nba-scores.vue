<template>
  <h1>NBA Scoreboard</h1>
  <h2>For {{ yesterdayLocaleString }}</h2>

  <div v-if="loadingState">
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>

  <div v-if="gameScores !== null && gameScores.response.length === 0 && gameScores.errors.length === 0">
    <p>Sorry no results. Perhaps no NBA games yesterday??</p>
  </div>
  <div v-if="error">
    <p>Oops! Error encountered: {{ error }}</p>
  </div>
  <div v-else-if="gameScores !== null" class="container">
    <template v-for="team in gameScores.response">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table>
        <template v-if="team.status.short !== 'FT' && team.status.short !== 'AOT'">
          <thead>
            <tr>
              <th scope="row" colspan="2">{{ team.status.long }}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><img :src="team.teams.away.logo" /></td>

              <td scope="row" colspan="2">{{ team.teams.away.name }}</td>
            </tr>
            <tr>
              <td><img :src="team.teams.home.logo" /></td>

              <td scope="row" colspan="2">{{ team.teams.home.name }}</td>
            </tr>
          </tbody>
        </template>

        <template v-else>
          <thead>
            <tr>
              <th scope="row">{{ team.status.short }}</th>
              <th colspan="2"></th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Q4</th>
              <th v-if="team.scores.home.over_time">O/T</th>
              <th scope="col" colspan="3">Final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img :src="team.teams.away.logo" /></td>
              <td scope="row" colspan="2">
                {{ team.teams.away.name }}
              </td>
              <td>{{ team.scores.away.quarter_1 }}</td>
              <td>{{ team.scores.away.quarter_2 }}</td>
              <td>{{ team.scores.away.quarter_3 }}</td>
              <td>{{ team.scores.away.quarter_4 }}</td>
              <td v-if="team.scores.away.over_time">
                {{ team.scores.away.over_time }}
              </td>
              <td :class="{
                winner: team.scores.away.total > team.scores.home.total,
              }" scope="col" colspan="3">
                {{ team.scores.away.total }}
              </td>
            </tr>
            <tr>
              <td><img :src="team.teams.home.logo" /></td>
              <td scope="row" colspan="2">
                {{ team.teams.home.name }}
              </td>
              <td>{{ team.scores.home.quarter_1 }}</td>
              <td>{{ team.scores.home.quarter_2 }}</td>
              <td>{{ team.scores.home.quarter_3 }}</td>
              <td>{{ team.scores.home.quarter_4 }}</td>
              <td v-if="team.scores.home.over_time">
                {{ team.scores.home.over_time }}
              </td>
              <td :class="{
                winner: team.scores.home.total > team.scores.away.total,
              }" scope="col" colspan="3">
                {{ team.scores.home.total }}
              </td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>
  </div>
</template>

<script setup>
import { inject } from "vue";
import {
  yesterdayISOString,
  yesterdayLocaleString,
} from "../modules/getDate.js";
import { useFetch } from "../modules/useFetch.js";

// ======= Variable Declarations ============ //
const currentNBASeason = inject("currentNBASeason");
const urlNBAScores = `https://v1.basketball.api-sports.io/games/?league=12&season=${currentNBASeason}&date=${yesterdayISOString}&timezone=America/New_York`;

// Fetch scores
const { data: gameScores, loadingState, error } = useFetch(urlNBAScores);
</script>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: 600;
}

h2 {
  font-size: 1.4rem;
  font-weight: 550;
  margin-left: -150px;
}

.container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  gap: 15px 50px;
  justify-items: start;
  align-items: start;
  width: max(75vw);
  margin: 0 auto 50px;
}

table {
  border-collapse: collapse;
  border-spacing: 5px;
  table-layout: auto;
  border: 3px solid #000;
  border-radius: 5px;
  margin-left: 15px;
  width: 100%;
}

thead {
  border-top: 4px solid #000;
}

th,
td {
  max-width: 10%;
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;
  padding: 0.3em;
  font-weight: 500;
  font-size: 1.3rem;
  caption-side: bottom;
}

th:first-child {
  text-align: left;
  vertical-align: middle;
  font-size: 1.3rem;
}

tr {
  border: 1px solid #000;
  height: 35px;
}

td:first-child {
  vertical-align: bottom;
  text-align: center;
  font-size: 1.5rem;
  padding: 5px;
}

td:last-child:not(:first-child) {
  font-weight: 700;
  font-size: 1.4rem;
}

th {
  background: #eee;
}

td>img {
  max-width: 42px;
  max-height: 42px;
  float: left;
  padding: 5px;
}

.winner {
  color: #a19923;
}

@media only screen and (max-width: 600px) {
  .container {
    grid-template-columns: 100%;
  }

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    width: 100vw;
  }

  h2 {
    font-size: 0.8rem;
    font-weight: 550;
    margin-left: -15px;
    width: 100vw;
  }
}
</style>
