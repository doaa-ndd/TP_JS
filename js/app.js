import { state } from "./state.js";
import { loadData } from "./dataService.js";
import { getCategories, getFilteredOrders, getOrderDetails, getStatistics } from "./selectors.js";
import { render, showError } from "./view.js";

function renderApp() {
  let selectedOrder = null;

  if (state.selectedOrderId !== null) {
    const order = state.orders.find(function (oneOrder) {
      return oneOrder.id === state.selectedOrderId;
    });

    if (order) {
      selectedOrder = getOrderDetails(order);
    }
  }

  render({
    state,
    statistics: getStatistics(),
    categories: getCategories(),
    orders: getFilteredOrders().map(function (order) {
      return getOrderDetails(order);
    }),
    selectedOrder
  });
}

async function init() {
  try {
    const data = await loadData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    renderApp();
  } catch (error) {
    console.error(error);
    showError("Les données n'ont pas pu être chargées. Vérifie les fichiers JSON et relance la page.");
  }
}

document.querySelector("#searchInput").addEventListener("input", function (event) {
  state.search = event.target.value;
  renderApp();
});

document.querySelector("#statusFilter").addEventListener("change", function (event) {
  state.status = event.target.value;
  renderApp();
});

document.querySelector("#categoryFilter").addEventListener("change", function (event) {
  state.category = event.target.value;
  renderApp();
});

document.querySelector("#ordersList").addEventListener("click", function (event) {
  if (event.target.classList.contains("show-details")) {
    state.selectedOrderId = Number(event.target.dataset.orderId);
    renderApp();
  }
});

document.querySelector("#orderDetails").addEventListener("click", function (event) {
  if (event.target.id === "closeDetails") {
    state.selectedOrderId = null;
    renderApp();
  }
});

init();
