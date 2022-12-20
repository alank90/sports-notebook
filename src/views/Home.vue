<template>
  <h1>The Sports Notebook Home</h1>
  <h2>All Your Sports Stats Here</h2>

  <div class="container">
    <img src="@/assets/img/aaron-judge.webp" alt="Aaron Judge Photo" />
    <img src="@/assets/img/kevin-durant.webp" alt="Kevin Durant Photo" />
    <img src="@/assets/img/josh-allen.webp" alt="Josh Allen Photo" />
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 20px 50px;
  max-height: 60vh;

}

img {
  width: 100%;
  overflow: hidden;
}


</style>
