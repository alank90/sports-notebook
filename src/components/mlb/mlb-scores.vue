<template>
    <h1>MLB Scores</h1>
    <h2>For {{ yesterdayLocaleString }}</h2>
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
const urlMLBScores = `https://v1.baseball.api-sports.io/games/?league=12&season=${currentMLBSeason}&date=${yesterdayISOString}&timezone=America/New_York`;
const hostName = import.meta.env.VITE_API_HOST_BASKETBALL;

// Fetch scores
const {
    data: gameScores,
    loadingState,
    error,
} = useFetch(urlMLBScores, hostName);
</script>

<style scoped>
h1 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 auto;
}
</style>
