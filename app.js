import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
  //nebo load, ten ceka na VSECHNO v HTML (treba video)
  loadData();
  app.router.init();
}); // az se nacte DOM, ale pred renderem, pred tim si hrajes s necim co neexistuje

window.addEventListener("appcartchanged", () => {
  const badge = document.getElementById("badge");
  const qty = app.store.order.reduce((acc, item) => acc + item.qty, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
