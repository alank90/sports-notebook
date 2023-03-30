<template>
  <h1>The Sports Notebook Home</h1>
  <h2>All Your Sports Stats Here</h2>

  <div class="container">
    <img src="@/assets/img/aaron-judge.webp" alt="Aaron Judge Photo" />
    <img src="@/assets/img/kevin-durant.webp" alt="Kevin Durant Photo" />
    <img src="@/assets/img/josh-allen.webp" alt="Josh Allen Photo" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 20px 50px;
  width: 100%;
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
}

img {
  width: 100%;
  overflow: hidden;
}
</style>
