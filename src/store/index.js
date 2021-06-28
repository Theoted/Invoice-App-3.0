import { createStore } from "vuex";

export default createStore({
  state: {
    invoices: [],
    currentInvoice: [],
    active: false,
    activeStatus: false,
    chevronRotateActive: false,
    totalInvoices: 0,
    blur: false,
  },
  getters: {
    getInvoices(state) {
      return state.invoices;
    },
    getCurrentInvoice(state) {
      return state.currentInvoice;
    },
    getActive(state) {
      return state.active;
    },
    getActiveStatus(state) {
      return state.activeStatus;
    },
    getChevronRotateActive(state) {
      return state.chevronRotateActive;
    },
    getTotalInvoices(state) {
      return state.totalInvoices;
    },
    getBlur(state) {
      return state.blur;
    }
  },
  mutations: {
    setCurrentInvoice(state, invoice) {
      state.currentInvoice = invoice;
    },
    toggleActive(state, newValue) {
      state.active = newValue;
    },
    toggleStatus(state, newValue) {
      state.activeStatus = newValue;
    },
    toggleChevron(state, newValue) {
      state.chevronRotateActive = newValue;
    },
    setTotalInvoices(state, newValue) {
      state.totalInvoices = newValue;
    },
    toggleBlur(state, newValue) {
      state.blur = newValue;
    } 
  },
  actions: {
    setCurrentInvoice({ commit, state }, invoiceId) {
      let invoiceFound = {};
      state.invoices.forEach((invoice) => {
        if (invoiceId == invoice.id) {
          invoiceFound = invoice;
        }
      });
      commit("setCurrentInvoice", invoiceFound);
    },
  },
  modules: {},
});
