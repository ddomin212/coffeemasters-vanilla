const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const route = a.getAttribute("href");
        Router.go(route);
      });
    });

    window.addEventListener("popstate", (e) => {
      Router.go(e.state.route, false);
    });

    Router.go(location.pathname);
  },
  go(route, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;

    if (route == "/") {
      pageElement = document.createElement("menu-page");
    } else if (route == "/order") {
      pageElement = document.createElement("order-page");
    } else if (route.startsWith("/product-")) {
      pageElement = document.createElement("details-page");
      const paramId = route.split("-")[1];
      pageElement.dataset.id = paramId;
    }

    if (pageElement) {
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = "";
      mainElement.appendChild(pageElement);
      window.scrollTo(0, 0);
    }
  },
};

export default Router;
