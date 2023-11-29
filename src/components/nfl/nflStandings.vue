<template>
  <h1>NFL Standings</h1>
  <div v-if="error">
    <p>Oops! Error encountered: {{ error.message }}</p>
  </div>
  <div v-else-if="nflStandings" class="container">
    <template v-for="team in nflStandings.response">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table>
        <tr> {{ team }} </tr>
      </table>
    </template>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFetch } from '../modules/useFetch.js';

// ======= Variable Declarations ============ //
const currentNFLSeason = "2023";
const urlNFLStandings = `https://v1.american-football.api-sports.io/standings?league=1&season=${currentNFLSeason}`


const { data: nflStandings, error } = useFetch(urlNFLStandings);

console.log(nflStandings);
// ============================================================================= //
// =============== Computed values for team standings by Division ============== //
// ============================================================================= //



// ============================================================================= //
// =============== End of Computed values for team standings by Division ======= //
// ============================================================================= //

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