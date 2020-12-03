import { template } from "./side-bar-template.js";

class SideBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = template;
  }
}

window.customElements.define("billy-sidebar", SideBar);
