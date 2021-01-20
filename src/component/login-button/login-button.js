import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../js/custom-element.js";

import { store } from "../../js/state/store.js";

class LoginButton extends LitElement {
  constructor() {
    super();

    store.subscribe(() => this.requestUpdate());
  }

  static getStyles() {
    return css`
      .loginButton {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 20px 0 15px;
        background-color: var(--billy-color-background-light);
        border: var(--billy-border);
        border-width: var(--billy-border-button-width-login);
        border-radius: 40px 0 0 40px;
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        color: var(--billy-color-text-primary-dark);
        font-family: var(--billy-font-family);
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
        cursor: pointer;
        transition: 0.2s;
        height: 50px;
      }

      .loginButton:visited {
        color: var(--billy-color-text-primary-dark);
      }

      .loginButton:hover {
        padding-right: 40px;
      }

      .loginButton__text {
        text-overflow: ellipsis;
        white-space: nowrap;
        line-break: none;
      }

      .loginButton__image {
        height: 20px;
        width: 20px;
        margin-right: 5px;
      }

      .loginButton__mobileIcon {
        display: none;
        height: 40px;
        width: 40px;
      }

      @media (max-width: 850px), (pointer: coarse) {
        .loginButton {
          background-color: var(--billy-color-background-loginbutton);
          border: none;
          box-shadow: none;
          margin-left: 0;
          padding-left: 0;
        }

        .loginButton:hover {
          padding-right: 20px;
        }

        .loginButton__image {
          display: none;
        }

        .loginButton__text {
          display: none;
        }

        .loginButton__mobileIcon {
          display: block;
          height: 50px;
        }
      }
    `;
  }

  render() {
    const state = store.getState();

    return html`
      <a
        class="loginButton"
        href="${store.getState().login.loggedIn ? `/profile` : `/login`}"
        aria-label="Naar login pagina"
      >
        ${
          state.login.loggedIn
            ? html`<img
                  alt="Organisatie logo"
                  class="loginButton__image"
                  src=${state.login.user.link
                    ? "/dist/assets/image/" + state.login.user.link + ".png"
                    : "/dist/assets/favicon.svg"}
                />
                <p class="loginButton__text">${this.getNameOfUser()}</p>
                <img
                  alt=""
                  class="loginButton__mobileIcon"
                  src="/dist/assets/icon/profile-icon.svg"
                />`
            : html` <p class="loginButton__text">Inloggen</p>
                <img
                  alt=""
                  class="loginButton__mobileIcon"
                  src="/dist/assets/icon/profile-icon.svg"
                />`
        }
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
