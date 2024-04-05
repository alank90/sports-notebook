<template>
    <h1>MLB Standings</h1>
    <!-- <div v-if="!loadingState && teamStandings && !error" class="container">
        <table>
            <template v-for="(league, index) in baseballLeaguesST">
                <thead>
                    <tr class="spacer"></tr>

                    <th>{{ league }} {{ index }}</th>
                    <tr>
                        <th scope="col" colspan="2">Team</th>
                        <th scope="col">W</th>
                        <th scope="col">L</th>
                        <th scope="col">PCT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="team in teamStandings[index].response[0]"
                        :key="team.team.id"
                    >
                        <th scope="row" colspan="2">
                            <img :src="team.team.logo" />{{ team.team.name }}
                        </th>
                        <td>{{ team.games.win.total }}</td>
                        <td>{{ team.games.lose.total }}</td>
                        <td>
                            {{ team.games.win.percentage.replace(/^0+/, "") }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
    </div> -->
</template>

<script setup>
import { ref, inject } from "vue";
import { useFetches } from "../modules/useFetches";

// ========= Variable Declarations =================== //
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST_BASEBALL;
let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};
const currentMLBSeason = inject("currentMLBSeason");

const mlbDivisions = ref([
    ["AL East", "AL Central", "AL West"],
    ["NL East", "NL Central", "NL West"],
]);
let urls = [];

// ---------- Create fetch array for the Baseball standings) ---------- //

/* fetch(
    `https://v1.baseball.api-sports.io/standings/?league=1&group=${mlbLeagues[0]}&season=${currentMLBSeason}`,
    requestOptions
)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error)); */

// Create an array of fetches for each MLB division to send to useFetches.js with urls array for the
// Promise.all call
for (let i = 0; i < mlbDivisions.value.length; i++) {
    for (let n = 0; n < mlbDivisions.value[i].length; n++) {
        urls.push(
            fetch(
                `https://v1.baseball.api-sports.io/standings/?league=1&group=${mlbDivisions.value[i][n]}&season=${currentMLBSeason}`,
                requestOptions
            ).then((res) => res.json())
        );
    }
}
console.log(urls);
// ------------ Fetch the data from the endpoint -------------- //

//let { apiData: teamStandings, loadingState, error } = useFetches(urls);

// -------------- End fetches --------------------------------- //
</script>

<style scoped>
@import "../../assets/css/tableStandings.css";

h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
}

thead > th:first-of-type {
    font-weight: 550;
    font-size: 1.3rem;
    text-align: left;
    background-color: #002d72;
}

.spacer {
    height: 25px;
}
</style>
