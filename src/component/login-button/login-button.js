import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../js/custom-element.js";

import { store } from "../../js/state/store.js";

class LoginButton extends LitElement {
  constructor() {
    super();

    store.subscribe(() => this.requestUpdate());
  }

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
        height: 30px;
        padding: 0 20px 0 15px;
        background-color: var(--billy-color-background-light);
        border: var(--billy-login-button-border);
        border-width: var(--billy-login-button-border-width);
        border-radius: 40px 0 0 40px;
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        color: var(--billy-color-text-primary-dark);
        font-family: var(--billy-font-family);
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
        cursor: pointer;
        transition: 0.2s;
      }

      .loginButton:visited {
        color: var(--billy-color-text-primary-dark);
      }

      .loginButton:hover {
        padding-right: 40px;
      }

      .loginButton--large {
        height: 50px;
      }

      .loginButton__image {
        height: 20px;
        width: 20px;
        margin-right: 5px;
      }
    `;
  }

  render() {
    return html`
      <a
        class="loginButton ${classMap({ "loginButton--large": this.large })}"
        @click="${this.login}"
        href="/login"
      >
        ${store.getState().login.loggedIn
          ? html`<img
                alt="Organisatie logo"
                class="loginButton__image"
                src=${store.getState().login.user.link
                  ? "/dist/assets/image/" + store.getState().login.user.link + ".png"
                  : "/dist/assets/favicon.svg"}
              />
              ${this.getNameOfUser()} `
          : html`Inloggen`}
      </button>
    `;
  }
  getNameOfUser() {
    if (store.getState().login.user.firstName !== "") {
      return store.getState().login.user.firstName + " " + store.getState().login.user.lastName;
    }
  }
}

defineElement("billy-login-button", LoginButton);
