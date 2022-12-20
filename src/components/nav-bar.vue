<!-- ========== Navbar Component ================ -->
<template>
  <nav>
    <router-link id="nav-title" to="/"><h1>Sports Notebook</h1></router-link>
    <ul>
      <li>
        <router-link class="nav-link" to="/nba" href="#">NBA</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/nfl" href="#">NFL</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/mlb" href="#">MLB</router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/about" href="#">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: top;
  padding: 20px 50px;
  box-shadow: 0 1px 8px #ddd;
}
li {
  list-style: none;
  display: inline-block;
  padding: 0 20px;
}
#nav-title {
  margin-right: auto;
  font-size: 0.9rem;
}

.nav-link {
  text-decoration: none;
  color: rgb(17, 11, 11);
  transition: all 0.3s ease 0s;
  font-size: 1.2rem;
}

.nav-link:hover {
  color: rgba(85, 85, 85, 0.69);
}
</style>
