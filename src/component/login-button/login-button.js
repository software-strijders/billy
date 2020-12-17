import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class LoginButton extends LitElement {
  static get properties() {
    return {
      large: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      .loginButton {
        display: flex;
        align-items: center;
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        border: none;
        cursor: pointer;
        background-color: white;
        height: 30px;
        font-family: var(--billy-font-family);
        font-size: 20px;
        padding: 0 20px 0 15px;
        border-radius: 40px 0 0 40px;
        transition: 0.2s;
      }

      .loginButton:hover {
        padding-right: 40px;
      }

      .loginButton--large {
        height: 50px;
      }
    `;
  }

  render() {
    return html`
      <button
        class="loginButton ${classMap({ "loginButton--large": this.large })}"
        @click="${this.login}"
      >
        ${localStorage.getItem("email") || "inloggen"}
      </button>
    `;
  }

  login() {
    window.location.href = "./login.html";
  }
}

customElements.define("billy-login-button", LoginButton);
