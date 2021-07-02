<template>
  <div class="invoices-place">
    <router-link
      class="invoice"
      :to="{ name: 'invoices', params: { id: invoice.id } }"
      v-for="(invoice, idx) in invoices"
      :key="idx.id"
    >
      <p class="invoice">
        <span class="invoice-id"><span>#</span>{{ invoice.invoiceId }}</span>
        <span class="due-date">Due {{ invoice.date }}</span>
        <span class="client-name">{{ invoice.clientName }}</span>
        <span class="total-price">€{{ invoice.allTotal }}</span>
        <span v-if="invoice.status === 'Pending'" class="pending-status"
          ><span><i class="fas fa-circle"></i></span>{{ invoice.status }}</span
        >
        <span v-else-if="invoice.status === 'Draft'" class="draft-status"
          ><span><i class="fas fa-circle"></i></span>{{ invoice.status }}</span
        >
        <span v-else-if="invoice.status === 'Paid'" class="paid-status"
          ><span><i class="fas fa-circle"></i></span>{{ invoice.status }}</span
        >
        <i class="fas fa-chevron-right"></i>
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "InvoicesPlace",
  components: {},
  computed: {
    invoices() {
      return this.$store.getters.getInvoices;
    },
  },
  methods: {
    log() {
      console.log(this.invoices);
    },
  },
};
</script>

<style scoped>
.invoices-place {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  padding: 0 10rem;
  max-height: 28rem;
  overflow: scroll;
  overflow-x: hidden;
}
.invoices-place a.invoice {
  box-shadow: 1px 5px 10px rgba(146, 146, 146, 0.2);
  margin: 1rem 0;
  transition: all 0.5s ease;
}
.invoices-place .invoice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  width: 100%;
  background-color: white;
  height: 4.5rem;
  margin: 0 2rem;
  border-radius: 0.5rem;
  transition: all 0.5s ease;
}

.invoices-place a.invoice:hover {
  transform: scale(1.03);
}

.invoices-place .invoice .invoice-id {
  color: #0c0e16;
  font-weight: 700;
}

.invoices-place .invoice .invoice-id span {
  color: #7e88c3;
}
.invoices-place .invoice .due-date {
  color: #7e88c3;
  font-size: 0.9rem;
}

.invoices-place .invoice .client-name {
  color: #7e88c3;
  font-size: 0.9rem;
}

.invoices-place .invoice .total-price {
  color: #0c0e16;
  font-weight: 700;
}

.invoices-place .invoice .pending-status {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(255, 143, 0, 0.1);
  color: #ff8f00;
  font-weight: 700;
  font-size: 0.9rem;
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.35rem;
}
.invoices-place .invoice .pending-status span {
  font-size: 0.6rem;
}
.invoices-place .invoice .draft-status {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(55, 59, 83, 0.1);
  color: #373b53;
  font-weight: 700;
  font-size: 0.9rem;
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.35rem;
}
.invoices-place .invoice .draft-status span {
  font-size: 0.6rem;
}
.invoices-place .invoice .paid-status {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(51, 214, 159, 0.1);
  color: #33d69f;
  font-weight: 700;
  font-size: 0.9rem;
  width: 8rem;
  height: 2.5rem;
  border-radius: 0.35rem;
}
.invoices-place .invoice .paid-status span {
  font-size: 0.6rem;
}
</style>
