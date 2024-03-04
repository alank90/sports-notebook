<template>
    <h1>NFL Scores</h1>
    <h2>As of {{ todayLocaleString }}</h2>

    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>

    <!-- ========  If the fetch failed =========================== -->
    <div v-if="error">Oops. Looks like there was an error: {{ error }} </div>

    <!-- ===== Else lets generate the markup =============-->
    <!-- ===== Wrapper Div ============== -->
    <div v-else-if="gameScores !== null">
        <template v-for="n in gameScores.length">
            <div v-if="gameScores[n - 1]?.results > 0" :key="n">
                <h3> {{ gameScores[n - 1].response[0]?.game.date.dayOfWeek }} Game(s) - {{ gameScores
                    ? gameScores[n - 1].response[0].game.week : '' }}</h3>

                <div class=" container table-wrapper">
                    <table v-for="gameInfo in gameScores[n - 1].response" id="scores" :key="gameInfo.game.id">
                        <thead>
                            <tr>
                                <th scope="row">{{ gameInfo.game.status.short }}</th>
                                <th colspan="2"></th>
                                <th>Q1</th>
                                <th>Q2</th>
                                <th>Q3</th>
                                <th>Q4</th>
                                <th v-if="gameInfo.game.status.long === 'Final/OT'">O/T</th>
                                <th scope="col" colspan="3">Final</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><img :src="gameInfo.teams.away.logo" /></td>
                                <td scope="row" colspan="2">
                                    {{ gameInfo.teams.away.name }}
                                </td>
                                <td>{{ gameInfo.scores.away.quarter_1 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_2 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_3 }}</td>
                                <td>{{ gameInfo.scores.away.quarter_4 }}</td>
                                <td v-if="gameInfo.game.status.long === 'Final/OT'">
                                    {{ gameInfo.scores.away.overtime }}
                                </td>
                                <td :class="{
                                    winner: gameInfo.scores.away.total > gameInfo.scores.home.total,
                                }" scope="col" colspan="3">
                                    {{ gameInfo.scores.away.total }}
                                </td>
                            </tr>
                            <tr>
                                <td><img :src="gameInfo.teams.home.logo" /></td>
                                <td scope="row" colspan="2">
                                    {{ gameInfo.teams.home.name }}
                                </td>
                                <td>{{ gameInfo.scores.home.quarter_1 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_2 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_3 }}</td>
                                <td>{{ gameInfo.scores.home.quarter_4 }}</td>
                                <td v-if="gameInfo.game.status.long === 'Final/OT'">
                                    {{ gameInfo.scores.home.overtime }}
                                </td>
                                <td :class="{
                                    winner: gameInfo.scores.home.total > gameInfo.scores.away.total,
                                }" scope="col" colspan="3">
                                    {{ gameInfo.scores.home.total }}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot valign="center">
                            <td colspan="8">Venue - {{ gameInfo.game.venue.city }} - {{ gameInfo.game.venue.name }}</td>
                        </tfoot>

                    </table>
                </div>
            </div>
            <!-- ====== If an error for that particular day occurred print it out ===================== -->
            <div v-else-if="gameScores[n - 1]?.errors.length !== 0" :key="gameScores[n - 1].response?.game.id">
                OOPS!. Error {{ gameScores[n - 1]?.errors }}
            </div>
        </template>
    </div>
</template>

<script setup>
import { inject, watch } from "vue";
import {
    todayLocaleString,
    today,
} from "../modules/getDate.js";
import { getPreviousWeeksDates } from "../modules/getFootballDates.js";
import { useFetches } from "../modules/useFetches.js";

// ======= Variable Declarations ============ //
const currentNFLSeason = inject("currentNFLSeason");
const API_KEY = import.meta.env.VITE_API_SPORTS_KEY;
const HOST_NAME = import.meta.env.VITE_API_HOST_BASKETBALL;

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

watch(gameScores, () => {
    gameScores.value.forEach((gameDay) => {
        if (gameDay.results > 0) {
            const getCorrectedDay = new Date(gameDay.response[0]?.game.date.date);
            getCorrectedDay.setDate(getCorrectedDay.getDate() + 1);
            const tempDayValue = getCorrectedDay.toLocaleDateString('en-US', { weekday: 'long' });
            gameDay.response[0].game.date.dayOfWeek = tempDayValue;
        }
    })
})

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

/* Responsive Styling */
@media screen and (max-width: 760px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>