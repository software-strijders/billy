import { template } from "./search-bar-template.js";

class SearchBar extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    if (this.hasAttribute('noshow')) {
      this._shadowRoot.querySelector('div').children[1].classList.remove('searchBar__link--show');
    }
  }
}

customElements.define("search-bar", SearchBar);
