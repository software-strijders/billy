import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class LoginButton extends LitElement {
  static get properties() {
    return {
      large: { type: Boolean }
    }
  }

  static getStyles() {
    return css`
      @import "../component/login-button/login-button.css";
    `;
  }

  render() {
    return html`
      <button class="loginButton ${classMap({ "loginButton--large": this.large })}" @click="${this.login}">Inloggen</button>
    `;
  }

  login() {
    window.location.href = "./login.html";
  }
}

customElements.define("billy-login-button", LoginButton);
