<template>
  <nav-bar></nav-bar>
  
  <!-- =============== route outlet ============================================= -->
  <!-- component matched by the route will render here ========================== -->
  <router-view></router-view>
  <!-- =============== End route outlet ========================================= -->

  <footer-item></footer-item>
</template>

<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import navBar from "@/components/nav-bar.vue";
  import footerItem from "@/components/footer-item.vue";
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    margin: 25px 0;
  }
</style>
