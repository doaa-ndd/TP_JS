import { state } from "./state.js";

export function getOrderDetails(order) {
  const customer = state.customers.find(function (oneCustomer) {
    return oneCustomer.id === order.customerId;
  });

  if (!customer) {
    throw new Error("Client introuvable pour la commande " + order.id);
  }

  const items = order.items.map(function (item) {
    const product = state.products.find(function (oneProduct) {
      return oneProduct.id === item.productId;
    });

    if (!product) {
      throw new Error("Produit introuvable dans la commande " + order.id);
    }

    return {
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity
    };
  });

  let total = 0;
  items.forEach(function (item) {
    total = total + item.lineTotal;
  });

  return { order, customer, items, total };
}

export function getFilteredOrders() {
  return state.orders.filter(function (order) {
    const details = getOrderDetails(order);
    const nameMatches = details.customer.name.toLowerCase().includes(state.search.toLowerCase());
    const statusMatches = state.status === "all" || order.status === state.status;

    let categoryMatches = state.category === "all";
    details.items.forEach(function (item) {
      if (item.category === state.category) {
        categoryMatches = true;
      }
    });

    return nameMatches && statusMatches && categoryMatches;
  });
}

export function getCategories() {
  const categories = state.products.map(function (product) {
    return product.category;
  });

  return categories.filter(function (category, index) {
    return categories.indexOf(category) === index;
  });
}

export function getStatistics() {
  let totalAmount = 0;

  state.orders.forEach(function (order) {
    totalAmount = totalAmount + getOrderDetails(order).total;
  });

  return {
    customerCount: state.customers.length,
    productCount: state.products.length,
    orderCount: state.orders.length,
    totalAmount
  };
}
