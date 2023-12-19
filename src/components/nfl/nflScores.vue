<template>
    <h1>NFL Scores</h1>
    <h2>For {{ yesterdayLocaleString }}</h2>
    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>
    <div v-else-if="gameScores.length > 0">
        <template v-for="n in gameScores.length">
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <h3> {{ new Date(gameScores[n -
                1].parameters.date).toLocaleDateString('en-us', {
                    weekday: 'long'
                }) }} Games - {{ gameScores
        ? gameScores[n - 1].response[0]?.game.week : '' }}</h3>

            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <div class=" container table-wrapper">
                <!-- eslint-disable-next-line vue/require-v-for-key  -->
                <table v-for="team in gameScores[n - 1].response" id="scores">
                    <thead>
                        <tr>
                            <th scope="row">{{ team.game.status.short }}</th>
                            <th colspan="2"></th>
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
                            <th v-if="team.game.status.long === 'Final/OT'">O/T</th>
                            <th scope="col" colspan="3">Final</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><img :src="team.teams.away.logo" /></td>
                            <td scope="row" colspan="2">
                                {{ team.teams.away.name }}
                            </td>
                            <td>{{ team.scores.away.quarter_1 }}</td>
                            <td>{{ team.scores.away.quarter_2 }}</td>
                            <td>{{ team.scores.away.quarter_3 }}</td>
                            <td>{{ team.scores.away.quarter_4 }}</td>
                            <td v-if="team.game.status.long === 'Final/OT'">
                                {{ team.scores.away.overtime }}
                            </td>
                            <td :class="{
                                winner: team.scores.away.total > team.scores.home.total,
                            }" scope="col" colspan="3">
                                {{ team.scores.away.total }}
                            </td>
                        </tr>
                        <tr>
                            <td><img :src="team.teams.home.logo" /></td>
                            <td scope="row" colspan="2">
                                {{ team.teams.home.name }}
                            </td>
                            <td>{{ team.scores.home.quarter_1 }}</td>
                            <td>{{ team.scores.home.quarter_2 }}</td>
                            <td>{{ team.scores.home.quarter_3 }}</td>
                            <td>{{ team.scores.home.quarter_4 }}</td>
                            <td v-if="team.game.status.long === 'Final/OT'">
                                {{ team.scores.home.overtime }}
                            </td>
                            <td :class="{
                                winner: team.scores.home.total > team.scores.away.total,
                            }" scope="col" colspan="3">
                                {{ team.scores.home.total }}
                            </td>
                        </tr>
                        <tr>Venue - {{ team.game.venue.city }} - {{ team.game.venue.name }}</tr>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
    <div v-else-if="gameScores[n - 1]?.errors.length !== 0">
        OOPS!. Error {{ gameScores?.errors }}
    </div>
    <div v-else>Sorry. Your request failed.</div>
</template>

<script setup>
import { inject } from "vue";
import {
    yesterdayLocaleString,
    today
} from "../modules/getDate.js";
import { getPreviousWeeksDates } from "../modules/getFootballDates.js";
import { useFetches } from "../modules/useFetches.js";

// ======= Variable Declarations ============ //
const currentNFLSeason = inject("currentNFLSeason");
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST;

let myHeaders = new Headers();
myHeaders.append("x-apisports-key", API_KEY);
myHeaders.append("x-rapidapi-host", HOST_NAME);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
};

let urls = [];

// Get Football game dates date
const { previousSundaysDateISOString, previousMondaysDateISOString, previousThursdaysDateISOString, previousSaturdaysDateISOString } = getPreviousWeeksDates(today);
console.log(previousSundaysDateISOString, previousMondaysDateISOString, previousThursdaysDateISOString, previousSaturdaysDateISOString);
const fetchPreviousSundaysNFLScores = fetch(`https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousSundaysDateISOString}&timezone=America/New_York`,
    requestOptions).then((res) => res.json());
const fetchPreviousMondaysNFLScores = fetch(`https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousMondaysDateISOString}&timezone=America/New_York`,
    requestOptions).then((res) => res.json());
const fetchPreviousThursdaysNFLScores = fetch(`https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousThursdaysDateISOString}&timezone=America/New_York`,
    requestOptions).then((res) => res.json());
const fetchPreviousSaturdaysNFLScores = fetch(`https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=${previousSaturdaysDateISOString}&timezone=America/New_York`,
    requestOptions).then((res) => res.json());
urls.push(fetchPreviousThursdaysNFLScores);
urls.push(fetchPreviousSaturdaysNFLScores);
urls.push(fetchPreviousSundaysNFLScores);
urls.push(fetchPreviousMondaysNFLScores);
console.log(urls);


// Fetch scores
const { apiData: gameScores, loadingState, error } = useFetches(urls);
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
    grid-template-rows: auto;
    gap: 15px 50px;
    justify-items: start;
    align-items: start;
    max-width: 1200px;
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
    font-size: 1.1rem;
    caption-side: bottom;
}

th {
    font-weight: bold;
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

td>img {
    max-width: 42px;
    max-height: 42px;
    float: left;
    padding: 5px;
}

/* Table stylings */
#scores td,
#scores th {
    border: 1px solid #ddd;
    padding: 8px;
}

#scores tr:nth-child(even) {
    background-color: #f2f2f2;
}

#scores tr:hover {
    background-color: #ddd;
}

#scores th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #1181b2;
    color: white;
}

.table-wrapper {
    width: 100%;
    max-width: 1020px;
    overflow-x: auto;
}


.winner {
    color: #a19923;
}
</style>