import { template } from "./search-bar-template.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("search-bar", SearchBar);
