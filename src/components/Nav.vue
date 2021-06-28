<template>
  <div class="nav">
    <div class="left-nav">
      <h1>Invoices</h1>
      <p v-if="totalInvoices === 0">No Invoices</p>
      <p v-else>There are {{ totalInvoices }} total invoices</p>
    </div>
    <div class="right-nav">
      <p
        @click="
          toggleStatus();
          toggleChevron();
        "
        :class="{ navPOverflow: activeStatusOverflow }"
      >
        Filter by status
        <i
          class="fas fa-chevron-down"
          :class="{ chevronRotate: activeChevronRotate }"
        ></i>
      </p>
      <ul class="ulMenu" :class="{ ulMove: activeStatus }">
        <li>
          <label for="draft">
            <span class="custom-checkbox"
              ><i class="fas fa-check" v-if="inputCheck[0].value"></i
            ></span>
            <input
              class="navInputs"
              type="checkbox"
              id="draft"
              @click="checkedInput()"
            />
            <span class="label-text">Draft</span>
          </label>
        </li>
        <li>
          <label for="pending">
            <span class="custom-checkbox"
              ><i class="fas fa-check" v-if="inputCheck[1].value"></i
            ></span>
            <input
              class="navInputs"
              type="checkbox"
              id="pending"
              @click="checkedInput()"
            />
            <span class="label-text">Pending</span>
          </label>
        </li>
        <li>
          <label for="paid">
            <span class="custom-checkbox"
              ><i class="fas fa-check" v-if="inputCheck[2].value"></i
            ></span>
            <input
              class="navInputs"
              type="checkbox"
              id="paid"
              @click="checkedInput()"
            />
            <span class="label-text">Paid</span>
          </label>
        </li>
      </ul>
      <button
        @click="
          toggleActive();
          disableStatusMenu();
          blurBg();
        "
      >
        <span><i class="fas fa-plus"></i></span> New Invoice
      </button>
    </div>
  </div>
  <div class="no-invoices-layout" v-if="totalInvoices === 0">
    <img src="../assets/illustration-empty.svg" alt="no-invoices" />
    <h2>There is nothing here</h2>
    <p>
      Create an invoice by clicking the <br />
      <span>New Invoice</span> button and get started
    </p>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      inputCheck: [{ value: false }, { value: false }, { value: false }],
    };
  },
  computed: {
    active() {
      return this.$store.getters.getActive;
    },
    activeStatus() {
      return this.$store.getters.getActiveStatus;
    },
    activeChevronRotate() {
      return this.$store.getters.getChevronRotateActive;
    },
    invoices() {
      return this.$store.getters.getInvoices;
    },
    invoicesLength() {
      return this.invoices.length;
    },
    totalInvoices() {
      return this.$store.getters.getTotalInvoices;
    },
    blur() {
      return this.$store.getters.getBlur;
    },
  },
  methods: {
    toggleActive() {
      this.$store.commit("toggleActive", (this.active = !this.active));
    },
    toggleStatus() {
      this.$store.commit(
        "toggleStatus",
        (this.activeStatus = !this.activeStatus)
      );
    },
    toggleChevron() {
      this.$store.commit(
        "toggleChevron",
        (this.activeChevronRotate = !this.activeChevronRotate)
      );
    },
    disableStatusMenu() {
      if (this.activeChevronRotate === true) {
        this.toggleChevron();
        this.toggleStatus();
      }
    },
    checkedInput() {
      const inputs = document.querySelectorAll(".navInputs");
      const customCheckbox = document.querySelectorAll(".custom-checkbox");

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          customCheckbox[i].style.backgroundColor = "#7c5dfa";
          this.inputCheck[i].value = true;
        } else {
          customCheckbox[i].style.backgroundColor = "#dfe3fa";
          this.inputCheck[i].value = false;
        }
      }
    },
    blurBg() {
      this.$store.commit("toggleBlur", (this.blur = !this.blur));
    },
  },
  watch: {
    invoicesLength(newValue, oldValue) {
      if (oldValue < newValue) {
        console.log("Plus grand");
        this.$store.commit("setTotalInvoices", newValue);
      } else {
        console.log("plus petit");
      }
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 10rem 0 10rem;
}

/* LEFT NAV */
.nav .left-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.nav .left-nav h1 {
  color: #0c0e16;
  margin: 0 0 1rem 0;
  letter-spacing: -1px;
}

.nav .left-nav p {
  color: #888eb0;
  margin: 0;
}

/* RIGHT NAV */

.nav .right-nav {
  display: flex;
  position: relative;
}

.nav .right-nav::before {
  content: "";
  position: absolute;
  top: -5rem;
  right: 10rem;
  width: 70%;
  height: 230%;
  background-color: #f8f8fb;
  z-index: 4;
}

.nav .right-nav p {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 12rem;
  color: #0c0e16;
  font-weight: 700;
  letter-spacing: -1px;
  cursor: pointer;
  z-index: 5;
}

.nav .right-nav p i {
  margin-left: 1rem;
  color: #7c5dfa;
  transition: all 1s ease;
}

.chevronRotate {
  transform: rotate(-180deg);
}

.nav .right-nav .ulMenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  top: -20rem;
  background-color: white;
  border-radius: 0.6rem;
  padding: 1rem 5rem 1rem 1.5rem;
  box-shadow: -3px 6px 15px rgba(146, 146, 146, 0.2);
  transition: all 1s ease;
}

.ulMove {
  top: 2.5rem !important;
}

.nav .right-nav ul li label {
  display: block;
  position: relative;
  font-weight: 600;
  color: #0c0e16;
  letter-spacing: -1px;
  user-select: none;
  cursor: pointer;
}

.nav .right-nav ul li label .label-text {
  margin-left: 2rem;
  line-height: 1.35rem;
}

.nav .right-nav ul li:nth-child(2) {
  padding: 0.8rem 0;
}

.nav .right-nav ul li label .custom-checkbox {
  position: absolute;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: #dfe3fa;
  border: 1.5px solid #dfe3fa;
  border-radius: 0.25rem;
}

.nav .right-nav ul li label .custom-checkbox .fa-check {
  color: white;
  font-size: 0.6rem;
}

.nav .right-nav ul li label:hover .custom-checkbox {
  border: 1.5px solid #7c5dfa;
}

.nav .right-nav ul li input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.nav .right-nav button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1.5rem;
  border: 0px solid transparent;
  border-radius: 5rem;
  width: 10rem;
  background-color: #7c5dfa;
  color: white;
  font-weight: 600;
  padding-right: 1rem;
  cursor: pointer;
  z-index: 5;
}
.nav .right-nav button span .fa-plus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 2.25rem;
  height: 2.25rem;
  margin-right: 1rem;
  background-color: white;
  border-radius: 50%;
  color: #7c5dfa;
}

.no-invoices-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vw;
}

.no-invoices-layout img {
  width: 25rem;
}

.no-invoices-layout h2 {
  color: #0c0e16;
}

.no-invoices-layout p {
  width: 20rem;
  color: #888eb0;
}

.no-invoices-layout p span {
  font-weight: 700;
}
</style>

