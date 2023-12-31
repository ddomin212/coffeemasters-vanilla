import { getProductById } from "./Menu.js";

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter((item) => item.id == id);
  if (results.length == 1) {
    app.store.cart = app.store.cart.map((item) => {
      if (item.id == id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((item) => item.id != id);
}
