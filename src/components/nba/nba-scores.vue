<template>
  <h1>NBA Scoreboard</h1>
  <h2>For {{ yesterdayLocaleString }}</h2>

  <div v-if="!loading" class="container">
    <template v-for="team in nbaScores.sportsData.response">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table>
        <template v-if="team.status.short !== 'FT'">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <thead>
            <tr>
              <th scope="row" colspan="2">{{ team.status.long }}</th>
            </tr>
          </thead>

          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tbody>
            <tr>
              <td scope="row" colspan="2">
                <img :src="team.teams.away.logo" />{{ team.teams.away.name }}
              </td>
            </tr>
            <tr>
              <td scope="row" colspan="2">
                <img :src="team.teams.home.logo" />{{ team.teams.home.name }}
              </td>
            </tr>
          </tbody>
        </template>

        <template v-else>
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <thead>
            <tr>
              <th scope="row" colspan="2">{{ team.status.short }}</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
              <th>Q4</th>
              <th v-if="team.scores.home.over_time">O/T</th>
              <th scope="col" colspan="3">Final</th>
            </tr>
          </thead>
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tbody>
            <tr>
              <td scope="row" colspan="2">
                <img :src="team.teams.away.logo" />{{ team.teams.away.name }}
              </td>
              <td>{{ team.scores.away.quarter_1 }}</td>
              <td>{{ team.scores.away.quarter_2 }}</td>
              <td>{{ team.scores.away.quarter_3 }}</td>
              <td>{{ team.scores.away.quarter_4 }}</td>
              <td v-if="team.scores.away.over_time">
                {{ team.scores.away.over_time }}
              </td>
              <td scope="col" colspan="3">{{ team.scores.away.total }}</td>
            </tr>
            <tr>
              <td scope="row" colspan="2">
                <img :src="team.teams.home.logo" />{{ team.teams.home.name }}
              </td>
              <td>{{ team.scores.home.quarter_1 }}</td>
              <td>{{ team.scores.home.quarter_2 }}</td>
              <td>{{ team.scores.home.quarter_3 }}</td>
              <td>{{ team.scores.home.quarter_4 }}</td>
              <td v-if="team.scores.home.over_time">
                {{ team.scores.home.over_time }}
              </td>
              <td scope="col" colspan="3">{{ team.scores.home.total }}</td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>
  </div>
  <div v-else>
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { todayISOString, yesterdayLocaleString } from "../modules/getDate.js";
import getData from "../modules/getData.js";
// ======= Variable Declarations ============ //
let loading = ref(true);
let nbaScores = ref([]);
const urlNBAScores = `https://v1.basketball.api-sports.io/games/?league=12&season=2022-2023&date=${todayISOString}`;

// Fetch scores
const retrieveScores = async () => {
  nbaScores.value = await getData(urlNBAScores);
  console.log("main function", nbaScores.value);
};

retrieveScores();
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
  grid-template-rows: 10%;
  gap: 15px 50px;
  justify-items: start;
  align-items: start;
  width: max(95vw);
  margin-bottom: 50px;
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

td > img {
  max-width: 48px;
  max-height: 48px;
  float: left;
  padding: 5px;
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