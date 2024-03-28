<template>
    <h1>MLB Scores</h1>
    <h2>For {{ yesterdayLocaleString }}</h2>

    <div v-if="loadingState">
        <p>Loading...</p>
        <img src="@/assets/img/loading.gif" alt="Loading Data" />
    </div>

    <!-- ======= Check for response and print out table ========= -->
    <div v-if="gameScores.errors?.token">
        {{ gameScores.errors.token }}
    </div>

    <div v-else-if="gameScores.results > 0" class="container">
        <template
            v-for="(team, index) in gameScores.response"
            :key="gameScores.response[index].id"
        >
            <table>
                <thead>
                    <tr>
                        <th scope="row">{{ team.status.short }}</th>
                        <th colspan="2"></th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>

                        <th v-if="team.scores.home.extra">Extra Innings</th>
                        <th scope="col" colspan="1">R</th>
                        <th scope="col" colspan="1">H</th>
                        <th scope="col" colspan="1">E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img :src="team.teams.away.logo" alt="Team Logo" />
                        </td>
                        <td scope="row" colspan="2">
                            {{ team.teams.away.name }}
                        </td>
                        <td>{{ team.scores.away.innings[1] }}</td>
                        <td>{{ team.scores.away.innings[2] }}</td>
                        <td>{{ team.scores.away.innings[3] }}</td>
                        <td>{{ team.scores.away.innings[4] }}</td>
                        <td>{{ team.scores.away.innings[5] }}</td>
                        <td>{{ team.scores.away.innings[6] }}</td>
                        <td>{{ team.scores.away.innings[7] }}</td>
                        <td>{{ team.scores.away.innings[8] }}</td>
                        <td>{{ team.scores.away.innings[9] }}</td>

                        <td v-if="team.scores.away.extra">
                            {{ team.scores.away.extra }}
                        </td>
                        <td
                            :class="{
                                winner:
                                    team.scores.away.total >
                                    team.scores.home.total,
                            }"
                            scope="col"
                            colspan="1"
                        >
                            {{ team.scores.away.total }}
                        </td>
                        <td>{{ team.scores.away.hits }}</td>
                        <td>{{ team.scores.away.errors }}</td>
                    </tr>
                    <tr>
                        <td><img :src="team.teams.home.logo" /></td>
                        <td scope="row" colspan="2">
                            {{ team.teams.home.name }}
                        </td>
                        <td>{{ team.scores.home.innings[1] }}</td>
                        <td>{{ team.scores.home.innings[2] }}</td>
                        <td>{{ team.scores.home.innings[3] }}</td>
                        <td>{{ team.scores.home.innings[4] }}</td>
                        <td>{{ team.scores.home.innings[5] }}</td>
                        <td>{{ team.scores.home.innings[6] }}</td>
                        <td>{{ team.scores.home.innings[7] }}</td>
                        <td>{{ team.scores.home.innings[8] }}</td>
                        <td>{{ team.scores.home.innings[9] }}</td>

                        <td v-if="team.scores.home.extra">
                            {{ team.scores.home.extra }}
                        </td>
                        <td
                            :class="{
                                winner:
                                    team.scores.home.total >
                                    team.scores.away.total,
                            }"
                            scope="col"
                            colspan="1"
                        >
                            {{ team.scores.home.total }}
                        </td>
                        <td>{{ team.scores.home.hits }}</td>
                        <td>{{ team.scores.home.errors }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
    <div v-else class="fallback-response">
        <p>Sorry, no game scores available for {{ yesterdayLocaleString }}.</p>
    </div>
    <!-- End v-else -->

    <!-- ======= End of print out table ========= -->
</template>

<script setup>
import { inject } from "vue";
import {
    yesterdayISOString,
    yesterdayLocaleString,
} from "../modules/getDate.js";
import { useFetch } from "../modules/useFetch.js";

// ======= Variable Declarations ============ //
const currentMLBSeason = inject("currentMLBSeason");
const urlMLBScores = `https://v1.baseball.api-sports.io/games/?league=1&season=${currentMLBSeason}&date=${yesterdayISOString}&timezone=America/New_York`;
const hostName = import.meta.env.VITE_API_HOST_BASEBALL;

// Fetch scores
const {
    data: gameScores,
    loadingState,
    error,
} = useFetch(urlMLBScores, hostName);
</script>

<style scoped>
@import "../../assets/css/tableScores.css";
h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
}

h2 {
    font-size: 1.2rem;
    font-weight: 650;
    margin: 0 auto;
}

td:nth-last-child(3),
th:nth-last-child(3) {
    font-weight: 600;
    font-size: 1.4rem;
    padding-left: 1.3rem;
}

.fallback-response {
    font-size: medium;
    font-weight: 550;
}
</style>
