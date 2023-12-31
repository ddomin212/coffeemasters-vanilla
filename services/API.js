const API = {
  url: "/data/menu.json",
  fetchMenu: async function () {
    const response = await fetch(this.url);
    return await response.json();
  },
};

export default API;
