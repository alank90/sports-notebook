<!-- ========== Navbar Component ================ -->
<template>
  <nav class="nav-container">
    <ul class="menu">
      <li>
        <router-link id="nav-title" to="/">Sports Notebook</router-link>
      </li>
      <li>
        NBA
        <ul class="sub-menu">
          <li>
            <router-link class="nav-link" to="/nba/standings" href="/nba"
              >Standings</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" to="/nba/scores" href="/nba"
              >Scores</router-link
            >
          </li>
        </ul>
      </li>
      <li>
        <router-link class="nav-link" to="/nfl" href="/nfl">NFL</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/mlb" href="/mlb"> MLB</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/about" href="/about"
          >About</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-container {
  width: 100%;
  margin: 0;
}
.router-link-active {
  color: #fff;
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
  font-size: 1.4rem;
  font-weight: 550;
}

.menu > li:first-child {
  flex-grow: 3;
  text-align: left;
}

.sub-menu {
  transform: scale(0);
  transform-origin: top center;
  transition: all 300ms ease-in-out;
}
.sub-menu li {
  font-size: 0.9rem;
  padding: 8px 0;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transform: scale(0);
  transform-origin: top center;
  transition: all 300ms ease-in-out;
}

.sub-menu li:last-child {
  border-bottom: 0;
}
.menu > li:hover .sub-menu li {
  transform: scale(1);
}
.menu > li:hover .sub-menu {
  transform: scale(1);
}

#nav-title {
  color: #07709c;
  font-size: 1.7rem;
}

a:not(.sub-menu > li > a) {
  font-size: 1.4rem;
  color: #000;
  font-weight: 550;
  outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
}

a:link {
  text-decoration: none;
  color: #000;
}

a:visited {
  text-decoration: none;
  color: #000;
}

a:hover {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.293);
}

a:active {
  text-decoration: none;
  color: #000;
}

@media only screen and (max-width: 500px) {
  nav {
    width: 100vw;
  }
}
</style>
