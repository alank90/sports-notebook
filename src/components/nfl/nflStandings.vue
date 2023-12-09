<template>
  <h1>NFL Standings</h1>
  <div v-if="error">
    <p>Oops! Error encountered: {{ error.message }}</p>
  </div>
  <div v-else-if="nflStandings !== null && nflStandings.errors.length === 0" class="container">
    <template v-for="n in 4">
      <!-- eslint-disable-next-line vue/require-v-for-key  -->
      <table>
        <thead>
          <tr>
            <th scope="col" colspan="2"></th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
            <th scope="col">GB</th>
          </tr>
        </thead>

        <template v-for="i in 4">
          <!-- eslint-disable-next-line vue/require-v-for-key  -->
          <tbody>
            <tr>
              <th scope="row" colspan="2">
                <img :src="afc[n - 1].value[i - 1].team.logo" />{{ afc[n - 1].value[i - 1].team.name }}
              </th>
              <td>{{ afc[n - 1].value[i - 1].won }}</td>
              <td>{{ afc[n - 1].value[i - 1].lost }}</td>
              <td v-if="afc[n - 1].value[i - 1].ties">{{ afc[n - 1].value[i - 1].ties }}</td>
              <td>{{ (parseInt(afc[n - 1].value[i - 1].won + (.5 * (afc[n - 1].value[i - 1].ties))) /
                (parseInt(afc[n - 1].value[i - 1].won) + parseInt(afc[n - 1].value[i - 1].lost +
                  parseInt(afc[n - 1].value[i - 1].ties))) * 100).toFixed(1) }}%</td>
            </tr>
          </tbody>
        </template>
      </table>
    </template>

  </div>
  <div v-else-if="nflStandings !== null">{{ nflStandings.errors.requests }}</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useFetch } from '../modules/useFetch.js';

// ======= Variable Declarations ============ //
const currentNFLSeason = "2023";
const urlNFLStandings = `https://v1.american-football.api-sports.io/standings?league=1&season=${currentNFLSeason}`
let afc = ref();

const { data: nflStandings, error } = useFetch(urlNFLStandings);


// ============================================================================= //
// =============== Computed  & Watch values for team standings by Division ============== //
// ============================================================================= //
const afcEastStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC East");
})

const afcNorthStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC North");
})

const afcSouthStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC South");
})

const afcWestStandings = computed(() => {
  return nflStandings.value.response.filter((team) => team.division === "AFC West");
})

watch(nflStandings, () => {
  if (nflStandings.value.response.length > 0) {
    calculateGamesBack(afc.value);
  }
}
)

// ============================================================================= //
// =============== End of Computed values for team standings by Division ======= //
// ============================================================================= //



// ------------------------------ Functions ------------------------------------------------------ //

const calculateGamesBack = (divisionArray) => {
  let gamesBack = Number;
  console.log("divisionArray", divisionArray[3].value[3].team.name);

  // Determine first place team in each division
  const firstPlaceTeam = {
    wins: divisionArray[0].value[0].won,
    losses: divisionArray[0].value[0].lost
  }

  divisionArray.forEach((division, index) => {
    console.log(division.value[index].position);
    if (division.value[index].position === 1) {
      division.value[index].gmsBk = "--";
    } else {
      console.log(division.value[index].team.name)
    }
  })

}
// ------------------------------ End Functions ---------------------------------------------------- //

afc.value = [afcEastStandings, afcNorthStandings, afcSouthStandings, afcWestStandings];


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