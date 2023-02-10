<template>
  <div class="container">
    <h1>NBA Standings by Conference Here</h1>
    <table>
      <caption>
        {{
          nbaTeamStandingsByConference[0].parameters.group
        }}
      </caption>

      <caption>
        {{
          nbaTeamStandingsByConference[1].parameters.group
        }}
      </caption>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;
let loading = ref(true);
let nbaTeamStandingsByConference = ref([]);
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
