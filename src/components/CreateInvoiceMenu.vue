<template>
  <div class="menu" :class="{ menuMove: getActive }">
    <form @submit.prevent>
      <h2>New Invoice</h2>
      <div class="billFrom">
        <p>Bill From</p>
        <label for="billFrom__streetAdress">Street Adress</label>
        <input
          type="text"
          name="billFrom__streetAdress"
          id="billFrom__streetAdress"
          autocomplete="off"
          v-model="type_FromStreet"
        />
        <div class="billFrom__completeAdress">
          <div class="billFrom__city">
            <label for="billFrom__city">City</label>
            <input
              type="text"
              name="billFrom__city"
              id="billFrom__city"
              autocomplete="off"
              v-model="type_FromCity"
            />
          </div>
          <div class="billFrom__postCode">
            <label for="billFrom__postCode">Post Code</label>
            <input
              type="text"
              name="billFrom__postCode"
              id="billFrom__postCode"
              autocomplete="off"
              v-model="type_FromPostCode"
            />
          </div>
          <div class="billFrom__country">
            <label for="billFrom__country">Country</label>
            <input
              type="text"
              name="billFrom__country"
              id="billFrom__country"
              autocomplete="off"
              v-model="type_FromCountry"
            />
          </div>
        </div>
      </div>

      <div class="billTo">
        <p>Bill To</p>
        <label for="billTo__clientName">Client's Name</label>
        <input
          type="text"
          name="billTo__clientName"
          id="billTo__clientName"
          autocomplete="off"
          v-model="type_ToClientName"
        />
        <label for="billTo__clientEmail">Client's Email</label>
        <input
          type="text"
          name="billTo__clientEmail"
          id="billTo__clientEmail"
          autocomplete="off"
          v-model="type_ToClientEmail"
        />
        <label for="billTo__streetAdress">Street Adress</label>
        <input
          type="text"
          name="billTo__streetAdress"
          id="billTo__streetAdress"
          autocomplete="off"
          v-model="type_ToClientStreetAdress"
        />
        <div class="billTo__completeAdress">
          <div class="billTo__city">
            <label for="billTo__city">City</label>
            <input
              type="text"
              name="billTo__city"
              id="billTo__city"
              autocomplete="off"
              v-model="type_ToClientCity"
            />
          </div>
          <div class="billTo__postCode">
            <label for="billTo__postCode">Post Code</label>
            <input
              type="text"
              name="billTo__postCode"
              id="billTo__postCode"
              autocomplete="off"
              v-model="type_ToClientPostCode"
            />
          </div>
          <div class="billTo__country">
            <label for="billTo__country">Country</label>
            <input
              type="text"
              name="billTo__country"
              id="billTo__country"
              autocomplete="off"
              v-model="type_ToClientCountry"
            />
          </div>
        </div>
      </div>

      <div class="invoiceDate">
        <div class="invoiceDate-input">
          <label for="date">Invoice Date</label>
          <input type="date" id="date" v-model="date" />
        </div>

        <div class="paymentTerms-input">
          <label for="paymentTerms">Payment Terms</label>
          <input
            list="terms"
            name="paymentTerms"
            id="paymentTerms"
            v-model="paymentTerms"
          />
          <datalist id="terms">
            <option value="Brut 10 days"></option>
            <option value="Net 10 days"></option>
            <option value="Brut 20 days"></option>
            <option value="Net 20 days"></option>
            <option value="Brut 30 days"></option>
            <option value="Net 30 days"></option>
          </datalist>
        </div>
      </div>

      <h3 class="itemListTitle">Item list</h3>
      <div v-for="item in addItemTotal" :key="item.id" class="itemList">
        <div class="item">
          <div class="itemName">
            <label for="itemName">Item Name</label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              autocomplete="off"
              v-model="itemName"
            />
          </div>
          <div class="itemQuantity">
            <label for="quantity">Qty.</label>
            <input
              class="numberInput"
              type="number"
              min="0"
              name="quantity"
              id="quantity"
              autocomplete="off"
              v-model="itemQty"
            />
          </div>
          <div class="itemPrice">
            <label for="price">Price</label>
            <input
              class="numberInput"
              type="number"
              min="0"
              name="price"
              id="price"
              autocomplete="off"
              v-model="itemPrice"
            />
          </div>
          <div class="itemTotal">
            <label for="total">Total</label>
            <input
              class="numberInput"
              type="number"
              min="0"
              name="total"
              id="total"
              autocomplete="off"
              v-model="totalPrice"
              disabled
            />
          </div>
          <i @click="deleteItem(i)" class="fas fa-trash-alt"></i>
        </div>
      </div>
      <button @click="addNewItem()" class="itemList_button">
        + Add New Item
      </button>

      <div class="bottomButtons">
        <button @click="toggleActive()" class="discard">Discard</button>
        <div class="save">
          <button @click="draftInvoice()">Save as Draft</button>
          <button @click="sendInvoice()">Save & Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CreateInvoiceMenu",
  data() {
    return {
      active: false,
      randomId: "",
      addItemTotal: [
        {
          id: 0,
          item: true,
        },
      ],

      formatedDate: "",
      type_FromStreet: "",
      type_FromCity: "",
      type_FromPostCode: "",
      type_FromCountry: "",
      date: "",

      type_ToClientName: "",
      type_ToClientEmail: "",
      type_ToClientStreetAdress: "",
      type_ToClientCity: "",
      type_ToClientPostCode: "",
      type_ToClientCountry: "",
      paymentTerms: "",

      itemName: "",
      itemQty: 0,
      itemPrice: 0,
      totalPrice: 0,
      totalPriceCalc: 0,
    };
  },
  computed: {
    invoicesStore() {
      return this.$store.getters.getInvoices;
    },
    getActive() {
      return this.$store.getters.getActive;
    },
    totalInvoices() {
      return this.$store.getters.getTotalInvoice;
    },
    blur() {
      return this.$store.getters.getBlur;
    }
  },
  methods: {
    sendInvoice() {
      this.toggleActive();
      this.generateInvoiceId();
      this.formatDate();
      this.unshiftInvoiceSend();
      this.incrementTotalInvoices();

      this.date = "";
      this.type_ToClientName = "";
      this.totalPrice = "";
    },
    draftInvoice() {
      this.toggleActive();
      this.generateInvoiceId();
      this.formatDate();
      this.unshiftInvoiceDraft();
      this.incrementTotalInvoices();

      this.date = "";
      this.type_ToClientName = "";
      this.totalPrice = "";
    },
    generateInvoiceId() {
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      let chaactersLength = characters.length;

      let randomNumbers =
        Math.floor(Math.random() * 10) +
        "" +
        Math.floor(Math.random() * 10) +
        "" +
        Math.floor(Math.random() * 10) +
        "" +
        Math.floor(Math.random() * 10) +
        "" +
        Math.floor(Math.random() * 10);

      for (let i = 0; i < 2; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * chaactersLength)
        );
      }
      let id = result + randomNumbers;
      this.randomId = id;
    },
    formatDate() {
      let now = moment(this.date).format("DD MMM YYYY");
      this.formatedDate = now;
    },
    unshiftInvoiceSend() {
      this.invoicesStore.unshift({
        id: this.invoicesStore.length,
        invoiceId: this.randomId,
        name: this.type_ToClientName,
        date: this.formatedDate,
        total: this.totalPrice,
        status: "Pending",
      });
    },
    unshiftInvoiceDraft() {
      this.invoicesStore.unshift({
        id: this.invoicesStore.length,
        invoiceId: this.randomId,
        name: this.type_ToClientName,
        date: this.formatedDate,
        total: this.totalPrice,
        status: "Draft",
      });
    },
    toggleActive() {
      this.$store.commit("toggleActive", (this.getActive = !this.getActive));
      this.blurBg();
    },
    incrementTotalInvoices() {
      this.$store.commit("setTotalInvoices", (this.totalInvoices += 1));
    },
    addNewItem() {
      this.addItemTotal.unshift({
        id: this.addItemTotal.length,
        item: true,
      });
    },
    deleteItem(i) {
      const item = document.querySelector(".item");
      item.remove();
      this.addItemTotal.splice(i, 1);
    },
    blurBg() {
      this.$store.commit("toggleBlur", (this.blur = !this.blur));
    },
  },
  watch: {
    itemPrice() {
      this.totalPriceCalc = this.itemPrice * this.itemQty;
      this.totalPrice = this.totalPriceCalc;
    },
    itemQty() {
      this.totalPriceCalc = this.itemPrice * this.itemQty;
      this.totalPrice = this.totalPriceCalc;
    },
  },
};
</script>

<style scoped>
.menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  overflow: scroll;
  overflow-x: hidden;
  padding: 2rem 4rem 0 4rem;
  left: -50rem;
  height: 100vh;
  top: 0;
  width: 40%;
  transition: all 0.5s ease;
  z-index: 15;
}

.menuMove {
  left: 5rem;
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  padding: 0 0 4rem 0;
}

input {
  height: 2rem;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 0.2rem;
  outline: none;
}

.billFrom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.billFrom p {
  color: #7c5dfa;
  font-weight: 600;
  margin-bottom: 2rem;
}

.billFrom label {
  color: #7e88c3;
  font-weight: 500;
}
.billFrom input {
  height: 2rem;
  width: 100%;
}

.billFrom #billFrom__streetAdress {
  width: 100%;
  margin: 1rem 0;
}

.billFrom__completeAdress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.billFrom__completeAdress div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 1.5rem 0;
}

.billFrom__completeAdress div:nth-child(2) {
  margin: 0 1rem;
}
.billFrom__completeAdress div input {
  margin-top: 1rem;
}

.billFrom__city,
.billFrom__postCode,
.billFrom__country {
  display: flex;
  flex-direction: column;
}

.billTo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.billTo p {
  color: #7c5dfa;
  font-weight: 700;
  margin: 2.5rem 0 2rem 0;
}

.billTo input {
  width: 100%;
  margin: 0.5rem 0 1.5rem 0;
}

.billTo label {
  color: #7e88c3;
  font-weight: 500;
}

.billTo__completeAdress {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.billTo__completeAdress .billTo__city,
.billTo__postCode,
.billTo__country {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.billTo__postCode {
  margin: 0 1rem;
}

.invoiceDate {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.invoiceDate .invoiceDate-input,
.paymentTerms-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 48%;
  color: #7e88c3;
  font-weight: 500;
}

.invoiceDate .invoiceDate-input input {
  width: 100%;
}

#paymentTerms {
  width: 100%;
}

.invoiceDate label {
  margin-bottom: 1rem;
}

/* Item List  */

.itemListTitle {
  margin-top: 3rem;
  color: #777f98;
}

.itemList {
  display: flex;
  align-items: center;
  width: 100%;
}

.itemList label {
  color: #7e88c3;
  font-weight: 500;
  margin-bottom: 1rem;
}

.itemList i {
  margin-top: 1.3rem;
}

.itemList .item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.itemList .item div {
  display: flex;
  flex-direction: column;
}

.itemList_button {
  width: 100%;
  margin: auto;
  height: 2.5rem;
  border: none;
  font-weight: 600;
  color: #7e88c3;
  background-color: #f9fafe;
  border-radius: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;
}

.itemName,
.itemPrice,
.itemTotal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.itemName input {
  font-weight: 600;
}

.itemQuantity input {
  width: 2rem;
  font-weight: 600;
  text-align: center;
}

.itemPrice input {
  width: 4.5rem;
  font-weight: 600;
  text-align: center;
}
.itemTotal input {
  width: 4.5rem;
  border: none;
  color: #888eb0;
  font-weight: 600;
}

.bottomButtons button {
  height: 2rem;
  width: 5rem;
}

.toggleMenu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.itemList {
  display: flex;
  flex-direction: column;
}

.itemList .item {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
}

.itemList .item .fa-trash-alt {
  margin-left: 0.5rem;
  cursor: pointer;
  color: rgba(59, 59, 59, 0.5);
}

.bottomButtons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.bottomButtons .discard {
  height: 2.5rem;
  border: none;
  font-weight: 600;
  color: #7e88c3;
  border-radius: 2rem;
  cursor: pointer;
  width: 7rem;
  background-color: #f9fafe;
}

.bottomButtons .save {
  display: flex;
  justify-content: space-between;
  width: 55%;
}

.bottomButtons .save button {
  width: 8rem;
  border-radius: 2rem;
  border: none;
  height: 2.5rem;
  font-weight: 600;
  cursor: pointer;
}

.bottomButtons .save :nth-child(1) {
  background-color: #373b53;
  color: #7e88c3;
}

.bottomButtons .save :nth-child(2) {
  background-color: #7c5dfa;
  color: white;
}
</style>