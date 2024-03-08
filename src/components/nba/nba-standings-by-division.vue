<template>
  <div v-if="!loadingState && teamStandingsByDivision" class="container">
    <table>
      <caption>
        Eastern Conference
      </caption>
      <template v-for="item in easternConferenceTeams">
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <thead>
          <tr>
            <th scope="col" colspan="2">{{ item.parameters.group }}</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
          </tr>
        </thead>
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <tbody>
          <tr v-for="team in item.response[0]" :key="team.team.id">
            <th scope="row" colspan="2">
              <img :src="team.team.logo" />{{ team.team.name }}
            </th>
            <td>{{ team.games.win.total }}</td>
            <td>{{ team.games.lose.total }}</td>
            <td>{{ team.games.win.percentage.replace(/^0+/, "") }}</td>
          </tr>
        </tbody>
      </template>
    </table>

    <table>
      <caption>
        Western Conference
      </caption>
      <template v-for="item in westernConferenceTeams">
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <thead>
          <tr>
            <th scope="col" colspan="2">{{ item.parameters.group }}</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">PCT</th>
          </tr>
        </thead>
        <!-- eslint-disable-next-line vue/require-v-for-key  -->
        <tbody>
          <tr v-for="team in item.response[0]" :key="team.team.id">
            <th scope="row" colspan="2">
              <img :src="team.team.logo" />{{ team.team.name }}
            </th>
            <td>{{ team.games.win.total }}</td>
            <td>{{ team.games.lose.total }}</td>
            <td>{{ team.games.win.percentage.replace(/^0+/, "") }}</td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
  <div v-else-if="loadingState">
    <p>Loading...</p>
    <img src="@/assets/img/loading.gif" alt="Loading Data" />
  </div>
  <div v-else>Sorry. Error retrieving data at this time. {{ error }}</div>
</template>

<script setup>
  import { ref, computed, inject } from "vue";
  import { useFetches } from "../modules/useFetches.js";

  // ======= Variable Declarations ============ //
  const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
  const HOST_NAME = import.meta.env.VITE_API_HOST_BASKETBALL;
  const currentNBASeason = inject("currentNBASeason");
  const nbaDivisions = ref([
    ["Atlantic", "Southeast", "Central"],
    ["Northwest", "Pacific", "Southwest"],
  ]);

  let easternConferenceTeams = ref([]);
  let westernConferenceTeams = ref([]);

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
          `https://v1.basketball.api-sports.io/standings/?league=12&group=${nbaDivisions.value[i][n]}&season=${currentNBASeason}`,
          requestOptions
        ).then((res) => res.json())
      );
    }
  }

  let {
    apiData: teamStandingsByDivision,
    loadingState,
    error,
  } = useFetches(urls);

  if (error.value) console.log("Error returned from doFetch() =>", error);

  // ======== Computed Values ======================= //
  easternConferenceTeams = computed(() => {
    return teamStandingsByDivision.value.filter((team) => {
      return nbaDivisions.value[0].includes(team.parameters.group);
    });
  });

  westernConferenceTeams = computed(() => {
    return teamStandingsByDivision.value.filter((team) => {
      return nbaDivisions.value[1].includes(team.parameters.group);
    });
  });
</script>

<style scoped>
  img[alt="Team Logo"] {
    width: 1rem;
  }

  .container {
    width: 100%;
    margin: 0 auto 5% auto;
  }

  div > p {
    font-size: 1.8rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
  }

  caption {
    font-weight: 550;
    font-size: 1.3rem;
    text-align: left;
    color: #333;
    margin: 15px 0;
    text-decoration: underline;
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

  tbody tr:nth-child(odd) {
    background-color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #eee;
  }

  tbody th {
    background-color: #3e7cb1;
    color: #fff;
    text-align: left;
  }

  tbody tr:nth-child(even) th {
    background-color: #81a4cd;
  }

  th > img {
    max-width: 20px;
    margin-right: 5px;
  }
</style>
