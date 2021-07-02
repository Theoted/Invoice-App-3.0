<template>
  <Menu />
  <SideBar />
  <div class="invoices">
    <div class="content">
      <router-link to="/" class="router-link"
        ><i class="fas fa-chevron-left"></i> Back
      </router-link>
      <div class="content-header">
        <div class="status">
          <p>Status</p>
          <span v-if="invoice.status === 'Pending'" class="pending-status"
            ><span><i class="fas fa-circle"></i></span
            >{{ invoice.status }}</span
          >
          <span v-else-if="invoice.status === 'Draft'" class="draft-status"
            ><span><i class="fas fa-circle"></i></span
            >{{ invoice.status }}</span
          >
          <span v-else-if="invoice.status === 'Paid'" class="paid-status"
            ><span><i class="fas fa-circle"></i></span
            >{{ invoice.status }}</span
          >
        </div>
        <div class="action-buttons">
          <button @click="toggleActive();blurBg()">Edit</button>
          <button>Delete</button>
          <button>Mark as Paid</button>
        </div>
      </div>
      <div class="main-content">
        <div class="main-content-header">
          <div class="invoice-id">
            <p><span>#</span>{{ invoice.invoiceId }}</p>
            <p>{{ invoice.projectDescription }}</p>
          </div>
          <div class="form-adress">
            <p>{{ invoice.fromStreet }}</p>
            <p>{{ invoice.fromCity }}</p>
            <p>{{ invoice.fromPostCode }}</p>
            <p>{{ invoice.fromCountry }}</p>
          </div>
        </div>
        <div class="main-content-middle">
          <div class="invoice-date">
            <div class="invoice--date">
              <p>Invoice Date</p>
              <p>Invoice date</p>
            </div>
            <div class="payement-due">
              <p>Payement Due</p>
              <p>{{ invoice.date }}</p>
            </div>
          </div>
          <div class="bill-to">
            <p>Bill To</p>
            <p>{{ invoice.clientName }}</p>
            <p>{{ invoice.clientStreet }}</p>
            <p>{{ invoice.clientCity }}</p>
            <p>{{ invoice.clientPostCode }}</p>
            <p>{{ invoice.clientCountry }}</p>
          </div>
          <div class="sent-to">
            <p>Sent To</p>
            <p>{{ invoice.clientEmail }}</p>
          </div>
        </div>
        <div class="main-content-bottom">
          <div class="main-content-bottom-card">
            <div class="item">
              <div class="item-name">
                <p>Item Name</p>
                <p class="name" v-for="i in invoice.items" :key="i.id">
                  {{ i.itemName }}
                </p>
              </div>
              <div class="item-qty">
                <p>QTY.</p>
                <p class="qty" v-for="i in invoice.items" :key="i.id">
                  {{ i.itemQty }}
                </p>
              </div>
              <div class="item-price">
                <p>Price</p>
                <p class="price" v-for="i in invoice.items" :key="i.id">
                  € {{ i.itemPrice }}
                </p>
              </div>
              <div class="item-total-price">
                <p>Total</p>
                <p class="total" v-for="i in invoice.items" :key="i.id">
                  € {{ i.totalPrice }}
                </p>
              </div>
            </div>
            <div class="total-due">
              <p>Amount Due</p>
              <p>€ {{ invoice.allTotal }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="blur-home"></div>
</template>

<script>
import UserAvatar from "../assets/image-avatar.jpg";
import Logo from "../assets/logo.svg";
import Menu from "../components/EditInvoiceMenu.vue";
import SideBar from "../components/SideBar.vue";
export default {
  name: "Invoice",
  props: ["id"],
  components: {
    Menu,
    SideBar,
  },
  data() {
    return {
      UserAvatar: UserAvatar,
      Logo: Logo,
    };
  },
  created() {
    this.$store.dispatch("setCurrentInvoice", this.id);
    this.calc();
  },
  computed: {
    invoice() {
      return this.$store.getters.getCurrentInvoice;
    },
    item() {
      return this.invoice.items;
    },
    active() {
      return this.$store.getters.getActive;
    },
    blur() {
      return this.$store.getters.getBlur;
    },
  },
  methods: {
    calc() {
      for (let i = 0; i < this.item.length; i++) {
        this.item[i].totalPrice = this.item[i].itemQty * this.item[i].itemPrice;
      }
    },
    toggleActive() {
      this.$store.commit("toggleActive", (this.active = !this.active));
    },
    blurBg() {
      this.$store.commit("toggleBlur", (this.blur = !this.blur));
    },
  },
  watch: {
    blur() {
      document.querySelector(".blur-home").classList.toggle("displayBlur");
    },
  },
};
</script>

<style scoped>
.sideBar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed !important;
  left: 0;
  top: 0;
  background: #f8f8fb;
  width: 5.5rem;
  height: 100%;
  z-index: 20;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  background: #7c5dfa;
  height: 5.5rem;
  width: 100%;
  border-radius: 0 1.2rem 1.2rem 0;
}

.logo::before {
  content: "";
  width: 100%;
  height: 50%;
  position: absolute;
  top: 3rem;
  background: #9277ff;
  border-radius: 1.3rem 0 0 0;
  z-index: 1;
}

.logo img {
  width: 45%;
  z-index: 3;
}

.sideColm {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 95%;
  background: #373b53;
  border-radius: 0 0 1.2rem 0;
}

.bottomBar hr {
  border: 0px solid white;
  border-bottom: 1px solid rgba(151, 151, 151, 0.5);
}

.bottomBar button {
  background-color: transparent;
  border: none;
  width: 100%;
  height: 3rem;
  color: #7e88c3;
  font-size: 1.2rem;
  cursor: pointer;
}

.bottomBar .user {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
}

.bottomBar .user img {
  border-radius: 50rem;
  width: 50%;
}

.invoices {
  height: 100vh;
  width: calc(100vw - 5.5rem);
  margin-left: 5.5rem;
}

/* MAIN CONTENT */

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  padding: 3rem 8rem;
  position: relative;
}

.content .router-link {
  color: #0c0e16;
  text-decoration: none;
  font-weight: 700;
}

.content .router-link i {
  color: #7c5dfa;
  margin-right: 2rem;
}

/* STATUS */
.content .content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 5rem;
  margin-top: 2rem;
  width: calc(100% - 4rem);
  padding: 0 2rem;
  border-radius: 0.3rem;
  box-shadow: 1px 5px 5px rgba(228, 228, 228, 0.1);
}

.content .content-header .status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22%;
}

.content .content-header .status p:nth-child(1) {
  color: #858bb2;
}

.content .content-header .status .pending-status span,
.draft-status span,
.paid-status span {
  font-size: 0.6rem;
}
.content .content-header .status .pending-status {
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

.content .content-header .status .draft-status {
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

.content .content-header .status .paid-status {
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

/* BUTTONS */

.content .content-header .action-buttons {
  display: flex;
  justify-content: space-between;
  width: 35%;
}

.content .content-header .action-buttons button {
  border: none;
  border-radius: 3rem;
  height: 3rem;
  font-weight: 600;
  cursor: pointer;
}

.content .content-header .action-buttons button:nth-child(1) {
  color: #7e88c3;
  background-color: #f9fafe;
  width: 5rem;
}
.content .content-header .action-buttons button:nth-child(2) {
  background-color: #ec5757;
  color: white;
  width: 5.5rem;
}
.content .content-header .action-buttons button:nth-child(3) {
  background-color: #7c5dfa;
  color: white;
  width: 8rem;
}

/* MAIN CONTENT */
/* MAIN CONTENT HEADER */

.main-content {
  width: calc(100% - 4rem);
  height: calc(60vh - 3rem);
  background-color: white;
  margin-top: 2rem;
  border-radius: 0.3rem;
  box-shadow: 1px 5px 5px rgba(228, 228, 228, 0.1);
  padding: 1.5rem 2rem;
  overflow: scroll;
  overflow-x: hidden;
}

.main-content .main-content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;
}

.main-content .main-content-header .invoice-id {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-content .main-content-header .invoice-id:nth-child(1) {
  color: #0c0e16;
  font-weight: 700;
}

.main-content .main-content-header .invoice-id:nth-child(1) span {
  color: #7e88c3;
}
.main-content .main-content-header .invoice-id p:nth-child(2) {
  font-size: 0.8rem;
  color: #7e88c3;
  font-weight: 500;
  margin: -0.5rem 0;
}

.main-content .main-content-header .form-adress {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8rem;
  color: #7e88c3;
  font-weight: 500;
}

.main-content .main-content-header .form-adress p {
  margin: 0.3rem 0;
}

/* MIDDLE */

.main-content .main-content-middle {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1.5rem;
}

.main-content .main-content-middle .invoice-date {
  text-align: start;
}
.main-content .main-content-middle .invoice-date div:nth-child(1) {
  margin-bottom: 2rem;
}
.main-content .main-content-middle .invoice-date div p {
  margin: 0.5rem 0;
}

.main-content .main-content-middle .invoice-date div p:nth-child(1) {
  color: #7e88c3;
  font-weight: 500;
  font-size: 0.8rem;
}
.main-content .main-content-middle .invoice-date div p:nth-child(2) {
  color: #0c0e16;
  font-weight: 700;
  font-size: 1rem;
}

.main-content .main-content-middle .invoice-date .invoice--date,
.payement-due {
  text-align: start;
}

.main-content .main-content-middle .bill-to {
  text-align: start;
}

.main-content .main-content-middle .bill-to p {
  color: #7e88c3;
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.main-content .main-content-middle .bill-to p:nth-child(1) {
  font-weight: 600;
}

.main-content .main-content-middle .bill-to p:nth-child(2) {
  font-weight: 700;
  color: #0c0e16;
  font-size: 1rem;
  margin: 0.8rem 0;
}

.main-content .main-content-middle .sent-to {
  text-align: start;
}

.main-content .main-content-middle .sent-to p:nth-child(1) {
  color: #7e88c3;
  font-weight: 600;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.main-content .main-content-middle .sent-to p:nth-child(2) {
  color: #0c0e16;
  font-weight: 700;
  font-size: 1rem;
}

/* BOTTOM */

.main-content-bottom .main-content-bottom-card .item {
  display: flex;
  justify-content: space-between;
  background-color: #9797972a;
  border-radius: 0.3rem 0.3rem 0 0;
  padding: 2rem;
}

.main-content-bottom .main-content-bottom-card .item .item-name p:nth-child(1),
.item-qty p:nth-child(1),
.item-price p:nth-child(1),
.item-total-price p:nth-child(1) {
  color: #7e88c3;
  margin-bottom: 2.5rem;
  font-weight: 500;
  font-size: 0.8rem;
}

.main-content-bottom .main-content-bottom-card .item .item-name {
  text-align: start;
}

.main-content-bottom .main-content-bottom-card .item .item-name .name,
.item-total-price .total {
  color: #0c0e16;
  font-weight: 700;
  font-size: 0.9rem;
}

.main-content-bottom .main-content-bottom-card .item .item-qty .qty,
.item-price .price {
  font-weight: 600;
  font-size: 0.9rem;
  color: #7e88c3;
}

.main-content-bottom .main-content-bottom-card .item .item-price,
.item-total-price {
  text-align: right;
}

.main-content-bottom .main-content-bottom-card .total-due {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: #373b53;
  color: white;
  border-radius: 0 0 0.3rem 0.3rem;
}

.main-content-bottom .main-content-bottom-card .total-due p:nth-child(2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

/* BLUR */

.blur-home {
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