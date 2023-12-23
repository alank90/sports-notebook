<template>
    <h1>NFL Scores</h1>
    <h2>As of {{ yesterdayLocaleString }}</h2>

    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>

    <!-- ===== Wrapper Div ============== -->
    <div v-if="gameScores !== null">
        <template v-for="n in gameScores.length">
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <div v-if="gameScores[n - 1]?.results > 0">
                <h3> {{ weekDays[n - 1] }} Game(s) - {{ gameScores
                    ? gameScores[n - 1].response[0]?.game.week : '' }}</h3>

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
            </div>
            <!-- ====== If an error occurred print it out ===================== -->
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <div v-else-if="gameScores[n - 1]?.errors.length !== 0">
                OOPS!. Error {{ gameScores?.errors }}
            </div>
        </template>
    </div>
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
const weekDays = ["Thursday", "Saturday", "Sunday", "Monday"];

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

// Fetch scores
const { apiData: gameScores, loadingState, error } = useFetches(urls);


</script>

<style scoped>
@import "../modules/table.css";

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
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 15px 50px;
    justify-items: center;
    align-items: center;
    margin-bottom: 50px;
}

.winner {
    color: #a19923;
}
</style>