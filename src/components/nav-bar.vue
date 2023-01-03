<!-- ========== Navbar Component ================ -->
<template>
  <nav>
    <ul class="menu">
      <li>
        <router-link id="nav-title" to="/">Sports Notebook</router-link>
      </li>
      <li>
        NBA
        <ul class="sub-menu">
          <li>
            <router-link class="nav-link" to="/nba" href="/nba"
              >NBA Standings</router-link
            >
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
  color: #000;
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

a:not(.sub-menu > li > a) {
  font-size: 1.5rem;
  color: #000;
  font-weight: 550;
  outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
}

a:link {
  color: #265301;
}

a:visited {
  color: #05509d;
}

a:focus {
  background: #05509d;
}

a:hover {
  background: #3063a159;
  border-radius: 5px;
  padding: 1px;
}

a:active {
  background: #265301;
  color: #05509d;
}
</style>
