<template>
  <img src="@/assets/img/nfl_logo.svg" alt="NFL logo" />

  <router-view></router-view>
</template>

<script setup>
import { provide } from "vue";

provide("currentNFLSeason", 2023)
</script>

<style scoped>
img {
  width: 150px;
}
</style>
