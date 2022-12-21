<!-- ========== Navbar Component ================ -->
<template>
  <nav>
    <router-link id="nav-title" to="/">Sports Notebook</router-link>
    <ul>
      <li>
        <router-link class="nav-link" to="/nba" href="/nba">NBA</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/nfl" href="/nfl">NFL</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/mlb" href="/mlb">MLB</router-link>
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
nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 20px 50px;
  box-shadow: 0 1px 8px #ddd;
  max-height: 1.8rem;
}
li {
  list-style: none;
  display: inline-block;
  padding: 0 20px;
}
#nav-title {
  color: rgb(17, 11, 11);
  margin-right: auto;
  font-size: 1.1rem;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all ease-in-out 0.6s;
}

#nav-title:hover {
  border-color: #1181b2;
}

.nav-link {
  text-decoration: none;
  color: rgb(17, 11, 11);
  transition: all 0.3s ease 0s;
  font-size: 1.2rem;
  border-bottom: 2px solid transparent;
  transition: color ease-in-out 0.6s;
}

.nav-link:hover {
  color: rgba(85, 85, 85, 0.69);
  text-decoration: underline;
  border-color: #1181b2;

}

.router-link-active {
  color: #1181b2;
  text-decoration: underline;
}
</style>
