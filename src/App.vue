<template>
  <router-link to="/"></router-link>
  <router-link to="/invoices/id"></router-link>
  <router-view />
</template>

<style>
#app {
  font-family: "Spartan", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F8f8fb;
  height: 100vw;
}

.home {
  position: relative;
  width: calc(100vw - 5.5rem);
  margin-left: 5.5rem;
  height: 100vh;
}
</style>
