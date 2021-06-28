<template>
  <router-link to="/"> Back </router-link>

  <h1>Invoice</h1>
  <p>Invoice#{{ invoice.invoiceId }}</p>
</template>

<script>
export default {
  name: "Invoice",
  props: ["id"],
  component: {},
  created() {
    this.$store.dispatch("setCurrentInvoice", this.id);
  },
  computed: {
    invoice() {
      return this.$store.getters.getCurrentInvoice;
    },
  },
};
</script>

<style scoped>
</style>