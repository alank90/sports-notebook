<template>
  <img src="@/assets/img/NBA.png" alt="NBA logo" />

  <router-view></router-view>
</template>

<script setup>
import { provide } from "vue";

provide("currentNBASeason", "2023-2024")

</script>

<style scoped>
img {
  width: 150px;
}
</style>
