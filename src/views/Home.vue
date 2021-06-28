<template>
  <SideBar />
  <CreateInvoiceMenu />
  <div class="home">
    <div id="nav">
      <Nav />
    </div>
    <InvoicesPlace />
  </div>
  <div class="blurHome"></div>
</template>

<script>
// @ is an alias to /src
import CreateInvoiceMenu from "../components/CreateInvoiceMenu.vue";
import InvoicesPlace from "../components/InvoicesPlace.vue";
import Nav from "../components/Nav.vue";
import SideBar from "../components/SideBar.vue";

export default {
  name: "Home",
  components: {
    CreateInvoiceMenu,
    InvoicesPlace,
    Nav,
    SideBar,
  },
  computed: {
    blur() {
      return this.$store.getters.getBlur;
    } 
  },
  watch: {
    blur() {
      document.querySelector(".blurHome").classList.toggle("displayBlur");
    },
  },
};
</script>

<style scoped>
.blurHome {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(29, 29, 29, 0.623);
  top: 0;
  left: 0;
  z-index: 10;
}

.displayBlur {
  display: block;
}
</style>
