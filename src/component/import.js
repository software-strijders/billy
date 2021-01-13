import "../js/logged-in-checker.js";
import "../js/location-change-event.js";
import "../js/router/router.js";

import "./app/app.js";
import "./article/article.js";
import "./aside/aside.js";
import "./category-bar/category-bar.js";
import "./category-option/category-option.js";
import "./contrast-toggle/contrast-toggle.js";
import "./contribute-button/contribute-button.js";
import "./editing-page/editing-page.js";
import "./editor/editor.js";
import "./hero/hero.js";
import "./layout/full-page-layout/full-page-layout.js";
import "./layout/side-bar-layout/side-bar-layout.js";
import "./login-button/login-button.js";
import "./login-window/login-window.js";
import "./page/article-page.js";
import "./page/create-page.js";
import "./page/home-page.js";
import "./page/login-page.js";
import "./page/search-page.js";
import "./results/results.js";
import "./result-item/result-item.js";
import "./result-item/no-result.js";
import "./search-bar/search-bar.js";
import "./side-bar/side-bar.js";
import "./top-bar/top-bar.js";
import "./back-arrow/back-arrow.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
