<template>
    <h1>NFL Scores</h1>
    <h2>For {{ yesterdayLocaleString }}</h2>
    <h3>NFL Scores here</h3>

    <div v-if="gameScores.errors.length !== 0">
        OOPS!. Error {{ gameScores.errors }}
    </div>
    <div v-else-if="gameScores.results > 0" class="container">
        <div>{{ gameScores.response }}</div>
    </div>
    <div v-else>No data.</div>
</template>

<script setup>
import { inject } from "vue";
import {
    yesterdayISOString,
    yesterdayLocaleString,
} from "../modules/getDate.js";
import { useFetch } from "../modules/useFetch.js";

// ======= Variable Declarations ============ //
const currentNFLSeason = inject("currentNFLSeason");
console.log("currentSeason", currentNFLSeason);
const urlNFLScores = `https://v1.american-football.api-sports.io/games?league=1&season=${currentNFLSeason}&date=2023-12-10&timezone=America/New_York`;

// Fetch scores
const { data: gameScores, error } = useFetch(urlNFLScores);
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
    width: max(95vw);
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
    font-size: 1.3rem;
    caption-side: bottom;
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

.winner {
    color: #a19923;
}
</style>