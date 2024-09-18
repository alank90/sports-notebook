<template>
    <h1>MLB Standings</h1>

    <div v-if="error">{{ error }}</div>

    <div v-else-if="!loadingState && divisions" class="container">
        <table v-for="(division, index) in divisions">
            <thead>
                <tr v-if="index === 'AL East'" class="spacer">
                    American League
                </tr>
                <tr v-if="index === 'NL East'" class="spacer">
                    National League
                </tr>
                <tr class="spacer"></tr>
                <tr>
                    <th scope="col" colspan="2">{{ index }}</th>
                    <th scope="col">W</th>
                    <th scope="col">L</th>
                    <th scope="col">PCT</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="team in division">
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
        </table>
    </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import { useFetches } from "../modules/useFetches";
import { useCreateDivisions, divisions } from "../modules/createMLBDivisions";
import gamesBack from "../modules/calculateGamesBack.js";

// ========= Variable Declarations =================== //
const currentMLBSeason = inject("currentMLBSeason");
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

let urls = [];
const mlbLeagues = ["American League", "National League"];

// ---------- End of Vars ---------- //

// Create an array of fetches for each MLB division to send to useFetches.js with urls
// array for the Promise.all call
for (let i = 0; i < mlbLeagues.length; i++) {
    urls.push(
        fetch(
            `https://v1.baseball.api-sports.io/standings/?league=1&group=${mlbLeagues[i]}&season=${currentMLBSeason}`,
            requestOptions
        ).then((res) => res.json())
    );
}

// ------------ Fetch the data from the endpoint -------------- //
let { apiData: teamStandings, loadingState, error } = useFetches(urls);
// -------------- End fetches --------------------------------- //

// ------------ Add the games back property to divisions object array ------- //
divisions.value = gamesBack(divisions.value);

// ================ Watch Function ============================ //
// Because of the asynchronous nature of useFetches() function  we need
// to create a watch function that watches when teamstandings becomes populated
// with fetch results and then we can call useCreateDivisions() to build an
// an array object of teams by division.
watch(teamStandings, (newTeamStandings, oldTeamStandings) => {
    // Create an object array with teams broken down by division
    useCreateDivisions(teamStandings);
});
</script>

<style scoped>
@import "../../assets/css/tableStandings.css";

h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
}

table {
    border: none;
}

table:nth-child(4) {
    margin-top: 2.2rem;
}

thead > th:first-of-type {
    font-weight: 550;
    font-size: 1.3rem;
    text-align: left;
    background-color: #002d72;
}
.spacer {
    height: 2rem;
    vertical-align: middle;
    display: table-cell;
    background-color: #edeef0;
    color: black;
}
</style>
