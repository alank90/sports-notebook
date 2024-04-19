<template>
    <img src="@/assets/img/mlb_logo.svg" alt="MLB Logo" />
    <router-view></router-view>
</template>

<script setup>
import { provide } from "vue";

provide("currentMLBSeason", "2024");
</script>

<style scoped>
img {
    width: 150px;
}
</style>
