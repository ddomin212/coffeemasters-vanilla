export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" }); //do we want to be accessible from outside?

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const reqeust = await fetch("/components/MenuPage.css");
      const css = await reqeust.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const templateContent = template.content.cloneNode(true);
    this.root.appendChild(templateContent);

    window.addEventListener("appmenuchanged", () => {
      this.render();
    });
  }

  render() {
    if (window.app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of window.app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class="category"></ul>
          `;

        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.forEach((item) => {
          const liItem = document.createElement("product-item");
          liItem.dataset.product = JSON.stringify(item);
          liCategory.querySelector("ul").appendChild(liItem);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Menu not available";
    }
  }
}
customElements.define("menu-page", MenuPage);
