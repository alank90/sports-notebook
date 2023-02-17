<template>
  <div class="container">
    <h1>Conference Standings</h1>

    <!-- --------------- Eastern Conference ------------------- -->
    <table v-if="easternConferenceItems[0]">
      <thead>
        <tr>
          <th scope="col" colspan="2">
            {{ easternConferenceItems[0].group.name }}
          </th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">PCT</th>
          <th>GB</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in easternConferenceItems" :key="item.team.id">
          <th scope="row" colspan="2">
            <img :src="item.team.logo" />{{ item.team.name }}
          </th>
          <td>{{ item.games.win.total }}</td>
          <td>{{ item.games.lose.total }}</td>
          <td>{{ item.games.win.percentage.replace(/^0+/, "") }}</td>
          <td>{{ item.gmsBk }}</td>
        </tr>
      </tbody>
    </table>
    <!-- --------------- Western Conference Standings ------------- -->
    <table v-if="westernConferenceItems[0]">
      <thead>
        <tr>
          <th scope="col" colspan="2">
            {{ westernConferenceItems[0].group.name }}
          </th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">PCT</th>
          <th>GB</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in westernConferenceItems" :key="item.team.id">
          <th scope="row" colspan="2">
            <img :src="item.team.logo" />{{ item.team.name }}
          </th>
          <td>{{ item.games.win.total }}</td>
          <td>{{ item.games.lose.total }}</td>
          <td>{{ item.games.win.percentage.replace(/^0+/, "") }}</td>
          <td>{{ item.gmsBk }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ======= Variable Declarations ============ //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;
let loading = ref(true);
let nbaItemStandingsByConference = [];
let easternConferenceItems = ref([]);
let westernConferenceItems = ref([]);

const nbaConferences = ["Eastern Conference", "Western Conference"];

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
for (let i = 0; i < nbaConferences.length; i++) {
  urls.push(
    fetch(
      `https://v1.basketball.api-sports.io/standings/?league=12&group=${nbaConferences[i]}&season=2022-2023`,
      requestOptions
    ).then((res) => res.json())
  );
}

/**
 * Function calculates the number of games back for eack team and then creates a
 * property on the __ConferenceItems array object item to store it. Yes this mutates
 * an object out of scope which is not good!! But I thought it was an elegant solution to problem
 * and worth the tradeoff.
 * @param {array} conferenceArray - Copy of the __ConferenceItems object array
 */
const calculateGamesBack = function (conferenceArray) {
  let gamesBack = Number;

  const firstPlaceTeam = {
    wins: conferenceArray[0].games.win.total,
    losses: conferenceArray[0].games.lose.total,
  };

  conferenceArray.forEach((team, index) => {
    if (team.position === 1) {
      team.gmsBk = "--";
    } else {
      gamesBack =
        (firstPlaceTeam.wins -
          firstPlaceTeam.losses -
          (team.games.win.total - team.games.lose.total)) /
        2;

      // Add games back number to the __ConferenceItems object w/spread syntax
      conferenceArray[index] = { ...team, gmsBk: gamesBack };
    }
  });
};

// ============== End function calculateGamesBack() =============================== //

// ======= fetch the NBA item standings ============ //
Promise.all(urls)
  .then((data) => {
    nbaItemStandingsByConference = data;
    easternConferenceItems.value = nbaItemStandingsByConference[0].response[0];
    westernConferenceItems.value = nbaItemStandingsByConference[1].response[0];
    loading.value = false;

    // Generate the .gmsBk property for use in the template
    calculateGamesBack(easternConferenceItems.value);
    calculateGamesBack(westernConferenceItems.value);
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

th > img {
  max-width: 20px;
  margin-right: 5px;
}
</style>
