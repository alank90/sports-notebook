<template>
  <h1>NFL Standings</h1>
  <div v-if="error">
    <p>Oops! Error encountered: {{ error.message }}</p>
  </div>
  <div v-else-if="nflStandings" class="container">
    <template v-for="team in afcEastStandings">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2">
            </th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
            <th>GB</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row" colspan="2">
              <img :src="team.team.logo" />{{ team.team.name }}
            </th>
            <td>{{ team.won }}</td>
            <td>{{ team.lost }}</td>
            <td v-if="team.ties">{{ team.ties }}</td>
            <td>{{ (parseInt(team.won + (.5 * (team.ties))) / (parseInt(team.won) + parseInt(team.lost +
              parseInt(team.ties))) * 100).toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </template>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFetch } from '../modules/useFetch.js';

// ======= Variable Declarations ============ //
const currentNFLSeason = "2023";
const urlNFLStandings = `https://v1.american-football.api-sports.io/standings?league=1&season=${currentNFLSeason}`


const { data: nflStandings, error } = useFetch(urlNFLStandings);


// ============================================================================= //
// =============== Computed values for team standings by Division ============== //
// ============================================================================= //
const afcEastStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC East");
})

/* const afcNorthStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC North");
}) */

// ============================================================================= //
// =============== End of Computed values for team standings by Division ======= //
// ============================================================================= //
const afc = ref([afcEastStandings]);

</script>


<style scoped>
h1 {
  font-size: 1.5rem;
}

.container {
  width: 100%;
  margin: 0 auto 5% auto;
}

div>p {
  font-size: 1.8rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
}

table:last-child {
  margin-top: 30px;
}

thead {
  background-color: #333;
  color: white;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 2%;
}

th,
td {
  font-size: 1.2rem;
  border: 1px solid black;
  padding: 8px;
}

thead th {
  width: 25;
}

tbody th {
  background-color: #3e7cb1;
  color: #fff;
  text-align: left;
}

tbody tr:nth-child(odd) {
  background-color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #eee;
}

tbody tr:nth-child(even) th {
  background-color: #81a4cd;
}

tbody tr:nth-child(6),
tbody tr:nth-child(10) {
  border-bottom: 10px solid #0880f9;
}

th>img {
  max-width: 20px;
  margin-right: 5px;
}
</style>