import { template } from "./login-window-template.js";

class LoginWindow extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("billy-login-window", LoginWindow);
