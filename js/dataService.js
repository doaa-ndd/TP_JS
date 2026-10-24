async function loadJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error("Erreur pendant le chargement de " + path);
  }

  return await response.json();
}

export async function loadData() {
  const customers = await loadJson("data/customers.json");
  const products = await loadJson("data/products.json");
  const orders = await loadJson("data/orders.json");

  return { customers, products, orders };
}
