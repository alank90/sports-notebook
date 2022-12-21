<template>
  <div class="footer">
    <a href="https://www.mlb.com" target="_blank"
      >MLB.com<img src="@/assets/img/mlb_logo.svg" width="35" height="35"
    /></a>
    <a href="https://www.nfl.com" target="_blank"
      >NFL.com<img src="@/assets/img/nfl_logo.svg" width="35" height="35"
    /></a>
    <a href="https://www.nba.com" target="_blank"
      >NBA.com<img src="@/assets/img/nba_logo.svg" width="35" height="35"
    /></a>
  </div>
</template>

<style scoped>
.footer {
  align-items: baseline;
  background-color: var(--blue);
  bottom: 0;
  display: flex;
  font-family: "Lora", sans-serif;
  font-size: 1.2rem;
  height: 5%;
  justify-content: space-evenly;
  left: 0;
  position: fixed;
  width: 100%;
}

.footer a {
  color: rgba(171, 200, 245, 0.8);
  text-decoration: none;
  transition: all 0.3s;
}

.footer a[href="https://www.mlb.com"]:hover,  .footer a[href="https://www.nfl.com"]:hover,  .footer a[href="https://www.nba.com"]:hover
{
  color: rgba(171, 200, 245, 0.5);
}

.footer a img {
  margin-left: 7px;
  height: 35px;
  max-width: 50px;
  vertical-align: middle;
  display: inline-block;
}
</style>
