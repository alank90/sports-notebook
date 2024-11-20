<template>
    <h1>NBA Scoreboard</h1>
    <h2>For {{ yesterdayLocaleString }}</h2>

    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>

    <div
        v-if="
            gameScores !== null &&
            gameScores.response.length === 0 &&
            gameScores.errors.length === 0
        "
    >
        <p>Sorry no results. Perhaps no NBA games yesterday??</p>
    </div>
    <div v-if="error">
        <p>Oops! Error encountered: {{ error }}</p>
    </div>
    <div v-else-if="gameScores !== null" class="container">
        <template v-for="team in gameScores.response">
            <!-- eslint-disable-next-line vue/require-v-for-key  -->
            <table>
                <template
                    v-if="
                        team.status.short !== 'FT' &&
                        team.status.short !== 'AOT'
                    "
                >
                    <thead>
                        <tr>
                            <th scope="row" colspan="2">
                                {{ team.status.long }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><img :src="team.teams.away.logo" /></td>

                            <td scope="row" colspan="2">
                                {{ team.teams.away.name }}
                            </td>
                        </tr>
                        <tr>
                            <td><img :src="team.teams.home.logo" /></td>

                            <td scope="row" colspan="2">
                                {{ team.teams.home.name }}
                            </td>
                        </tr>
                    </tbody>
                </template>

                <template v-else>
                    <thead>
                        <tr>
                            <th scope="row">{{ team.status.short }}</th>
                            <th colspan="2"></th>
                            <th>Q1</th>
                            <th>Q2</th>
                            <th>Q3</th>
                            <th>Q4</th>
                            <th v-if="team.scores.home.over_time">O/T</th>
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
                            <td v-if="team.scores.away.over_time">
                                {{ team.scores.away.over_time }}
                            </td>
                            <td
                                :class="{
                                    winner:
                                        team.scores.away.total >
                                        team.scores.home.total,
                                }"
                                scope="col"
                                colspan="3"
                            >
                                {{ team.scores.away.total }}
                            </td>
                        </tr>
                        <!-- ------- Away team score line End----------- -->

                        <!--======================================================-->
                        <!--============ Game Stats row for away team ============-->
                        <!--======================================================-->

                        <nbaGameStats
                            :prop_HOST_NAME="HOST_NAME"
                            :prop_team="awayTeam"
                            :prop_gameID="team.id"
                        />

                        <!--======================================================-->
                        <!--============ Game Stats row for away team End ========-->
                        <!--======================================================-->

                        <!-- ------- Home team score line ----------- -->

                        <tr>
                            <td><img :src="team.teams.home.logo" /></td>
                            <td scope="row" colspan="2">
                                {{ team.teams.home.name }}
                            </td>
                            <td>{{ team.scores.home.quarter_1 }}</td>
                            <td>{{ team.scores.home.quarter_2 }}</td>
                            <td>{{ team.scores.home.quarter_3 }}</td>
                            <td>{{ team.scores.home.quarter_4 }}</td>
                            <td v-if="team.scores.home.over_time">
                                {{ team.scores.home.over_time }}
                            </td>
                            <td
                                :class="{
                                    winner:
                                        team.scores.home.total >
                                        team.scores.away.total,
                                }"
                                scope="col"
                                colspan="3"
                            >
                                {{ team.scores.home.total }}
                            </td>
                        </tr>
                    </tbody>
                </template>
            </table>
        </template>
    </div>
</template>

<script setup>
import { inject } from "vue";
import {
    yesterdayISOString,
    yesterdayLocaleString,
} from "../modules/getDate.js";
import { useFetch } from "../modules/useFetch.js";
import nbaGameStats from "./nba-game-stats.vue";

// ======= Variable Declarations ============ //
const currentNBASeason = inject("currentNBASeason");
const urlNBAScores = `https://v1.basketball.api-sports.io/games/?league=12&season=${currentNBASeason}&date=${yesterdayISOString}&timezone=America/New_York`;
const HOST_NAME = import.meta.env.VITE_API_HOST_BASKETBALL;
const homeTeam = 0;
const awayTeam = 1;

// ========== Fetch scores =============== //
const {
    data: gameScores,
    loadingState,
    error,
} = useFetch(urlNBAScores, HOST_NAME);
</script>

<style scoped>
@import "../../assets/css/tableScores.css";
h1 {
    font-size: 2rem;
    font-weight: 600;
}

h2 {
    font-size: 1.4rem;
    font-weight: 550;
    margin-left: -150px;
}

td:last-child,
th:last-child {
    font-weight: 700;
    font-size: 1.4rem;
    padding-left: 1.3rem;
}
</style>
