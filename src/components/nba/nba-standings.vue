<template>
  <h1>NBA Standings</h1>
  <toggleButton @toggleClicked="(trigger) => (parentTrigger = trigger)" />

  <nbaStandingsByConference v-if="parentTrigger"></nbaStandingsByConference>
  <nbaStandingsByDivision v-if="!parentTrigger"></nbaStandingsByDivision>
</template>

<script setup>
import { ref } from "vue";
import nbaStandingsByDivision from "./nba-standings-by-division.vue";
import nbaStandingsByConference from "./nba-standings-by-conference.vue";

import toggleButton from "../toggle-button.vue";

let parentTrigger = ref(true);
</script>
