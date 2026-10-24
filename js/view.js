function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(amount) {
  return new Intl.NumberFormat("fr-MA").format(amount) + " MAD";
}

export function showError(message) {
  const errorMessage = document.querySelector("#errorMessage");
  errorMessage.textContent = message;
  errorMessage.classList.remove("d-none");
}

export function render(data) {
  document.querySelector("#customerCount").textContent = data.statistics.customerCount;
  document.querySelector("#productCount").textContent = data.statistics.productCount;
  document.querySelector("#orderCount").textContent = data.statistics.orderCount;
  document.querySelector("#totalAmount").textContent = formatMoney(data.statistics.totalAmount);
  document.querySelector("#searchInput").value = data.state.search;
  document.querySelector("#statusFilter").value = data.state.status;

  const categoryFilter = document.querySelector("#categoryFilter");
  categoryFilter.innerHTML = '<option value="all">Toutes les catégories</option>';
  data.categories.forEach(function (category) {
    categoryFilter.innerHTML += '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + "</option>";
  });
  categoryFilter.value = data.state.category;

  const ordersList = document.querySelector("#ordersList");
  ordersList.innerHTML = "";

  data.orders.forEach(function (details) {
    ordersList.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <article class="card p-3">
          <h3 class="h5">Commande #${details.order.id}</h3>
          <p class="mb-1">Client : ${escapeHtml(details.customer.name)}</p>
          <p class="mb-1">Date : ${escapeHtml(details.order.date)}</p>
          <p class="mb-1">Statut : ${escapeHtml(details.order.status)}</p>
          <p class="mb-3">Total : ${formatMoney(details.total)}</p>
          <button class="btn btn-primary show-details" data-order-id="${details.order.id}">
            Voir le détail
          </button>
        </article>
      </div>`;
  });

  if (data.orders.length === 0) {
    ordersList.innerHTML = '<p class="col-12">Aucune commande ne correspond à la recherche.</p>';
  }

  const detailsSection = document.querySelector("#orderDetails");
  if (data.selectedOrder) {
    let productRows = "";
    data.selectedOrder.items.forEach(function (item) {
      productRows += `
        <li>${escapeHtml(item.name)} : ${formatMoney(item.price)} x ${item.quantity}
        = ${formatMoney(item.lineTotal)}</li>`;
    });

    detailsSection.innerHTML = `
      <div class="d-flex justify-content-between align-items-start">
        <h2 class="h4">Détail de la commande #${data.selectedOrder.order.id}</h2>
        <button id="closeDetails" class="btn btn-secondary btn-sm">Fermer</button>
      </div>
      <p class="mb-1">Client : ${escapeHtml(data.selectedOrder.customer.name)}</p>
      <p class="mb-1">Ville : ${escapeHtml(data.selectedOrder.customer.city)}</p>
      <p class="mb-1">Date : ${escapeHtml(data.selectedOrder.order.date)}</p>
      <p class="mb-1">Statut : ${escapeHtml(data.selectedOrder.order.status)}</p>
      <ul class="mt-2">${productRows}</ul>
      <strong>Total : ${formatMoney(data.selectedOrder.total)}</strong>`;
    detailsSection.classList.remove("d-none");
  } else {
    detailsSection.innerHTML = "";
    detailsSection.classList.add("d-none");
  }
}
