import { template } from "./login-button-template.js";

class LoginButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.addEventListener("click", this.login);
  }

  login() {
    //Go to the login page here
  }
}

customElements.define("login-button", LoginButton);
