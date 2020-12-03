import { template } from "./login-button-template.js";

class LoginButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    if (this.hasAttribute('loginButton--large')) {
      this._shadowRoot.querySelector('button').classList.add("loginButton--large");
    }
    this.addEventListener("click", this.login);
  }

  login() {
    window.location.href = "../base/login.html";
  }
}

customElements.define("billy-login-button", LoginButton);
