import { Router } from "@vaadin/router";

// This is where the router will output the component
const outlet = document.querySelector("#root");
const router = new Router(outlet);
router.setRoutes([
  // This is where you can define routes
  // For more information, visit:
  // https://vaadin.github.io/vaadin-router/vaadin-router/#/classes/Router/demos/demo/index.html
  { path: "/",        component: "billy-home-page"    },
  { path: "/login",   component: "billy-login-page"   },
  { path: "/search",  component: "billy-search-page"  },
  { path: "/article", component: "billy-article-page" },
  { path: "/create",  component: "billy-create-page" },
]);
