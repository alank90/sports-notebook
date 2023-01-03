<!-- ========== Navbar Component ================ -->
<template>
  <nav>
    <ul class="menu">
      <li>
        Sports Notebook
        <router-link id="nav-title" to="/"></router-link>
      </li>
      <li>
        NBA
        <ul class="sub-menu">
          <li>
            NBA Standings
            <router-link class="nav-link" to="/nba" href="/nba"></router-link>
          </li>
        </ul>
      </li>
      <li>
        NFL
        <router-link class="nav-link" to="/nfl" href="/nfl"></router-link>
      </li>
      <li>
        MLB
        <router-link class="nav-link" to="/mlb" href="/mlb"></router-link>
      </li>
      <li>
        About
        <router-link class="nav-link" to="/about" href="/about"></router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav > li:first-child {
  color: #05509d;
}
ul.menu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end; 
  align-items: baseline;
  column-gap: 20px;
  padding: 20px 50px;
  box-shadow: 0 1px 8px #ddd;
  max-height: 1.8rem;
}
.menu > li {
  color: #000;
  cursor: pointer;
  font-size: 1.1rem;
}
.sub-menu {
  transform: scale(0);
  transform-origin: top center;
  transition: all 300ms ease-in-out;
}
.sub-menu li {
  font-size: 14px;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px 0;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transform: scale(0);
  transform-origin: top center;
  transition: all 300ms ease-in-out;
}
.sub-menu li:last-child {
  border-bottom: 0;
}
.sub-menu li:hover {
  background: black;
}
.menu > li:hover .sub-menu li {
  transform: scale(1);
}
.menu > li:hover .sub-menu {
  transform: scale(1);
}

.router-link-active {
  color: #72cdf1;
  text-decoration: underline;
}
</style>
