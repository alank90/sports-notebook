<template>
  <div class="container">
    <h1>Conference Standings</h1>

    <!-- --------------- Eastern Conference ------------------- -->
    <table>
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
    <!-- --------------- Western Conference Standings ------------- -->
    <table>
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
</template>

<script setup>
import { ref, computed } from "vue";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;
let loading = ref(true);
let nbaTeamStandingsByConference = ref([]);
let easternConferenceTeams = ref([]);
let westernConferenceTeams = ref([]);
const nbaConferences = ref(["Eastern Conference", "Western Conference"]);

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let urls = [];

// Populate the urls array with url's of each conference for API fetch's
for (let i = 0; i < nbaConferences.value.length; i++) {
  urls.push(
    fetch(
      `https://v1.basketball.api-sports.io/standings/?league=12&group=${nbaConferences.value[i]}&season=2022-2023`,
      requestOptions
    ).then((res) => res.json())
  );
}

// ======= fetch the NBA team standings ============ //
Promise.all(urls)
  .then((data) => {
    nbaTeamStandingsByConference.value = data;
    loading.value = false;
  })
  .catch((error) => console.log("Error fetching data ==>", error));

// ======== Computed Values ======================= //
easternConferenceTeams = computed(() => {
  return nbaTeamStandingsByConference.value.filter((team) => {
    return nbaConferences.value[0].includes(team.parameters.group);
  });
});

westernConferenceTeams = computed(() => {
  return nbaTeamStandingsByConference.value.filter((team) => {
    return nbaConferences.value[1].includes(team.parameters.group);
  });
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

.container {
  width: 900px;
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
  border-bottom: 10px solid #05509d;
}

th > img {
  max-width: 20px;
  margin-right: 5px;
}
</style>
