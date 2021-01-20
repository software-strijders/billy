import "./logged-in-checker";
import "./location-change-event";
import "./router/router";

import "./component/app/app";
import "./component/article/article";
import "./component/aside/aside";
import "./component/back-arrow/back-arrow";
import "./component/category-bar/category-bar";
import "./component/category-option/category-option";
import "./component/contrast-toggle/contrast-toggle";
import "./component/contribute-button/contribute-button";
import "./component/editing-page/editing-page";
import "./component/editor/editor";
import "./component/hero/hero";
import "./component/horizontal-line/horizontal-line";
import "./component/layout/full-page-layout/full-page-layout";
import "./component/layout/side-bar-layout/side-bar-layout";
import "./component/login-button/login-button";
import "./component/login-window/login-window";
import "./component/page/article-page";
import "./component/page/create-page";
import "./component/page/home-page";
import "./component/page/login-page";
import "./component/page/search-page";
import "./component/page/profile-page";
import "./component/profile/profile";
import "./component/results/results";
import "./component/result-item/result-item";
import "./component/result-item/no-result";
import "./component/search-bar/search-bar";
import "./component/side-bar/side-bar";
import "./component/top-bar/top-bar";

if ("serviceWorker" in navigator && import.meta.env.MODE === "production") {
  navigator.serviceWorker.register("service-worker.js");
}
