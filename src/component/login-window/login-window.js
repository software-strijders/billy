import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";

import { logIn } from "../../js/api/api";
import { store } from "../../js/state/store";
import { actions } from "../../js/state/login";
import { defineElement } from "../../js/custom-element";

// TODO: This is not really appropriate to be a component, it should be split into
// smaller components
class LoginWindow extends LitElement {
  static getStyles() {
    return css`
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px;
      }

      .field {
        height: 50px;
        display: flex;
        margin: 0;
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        border-radius: 100px;
        padding: 0;
      }

      .field__input {
        height: 100%;
        margin: 0;
        width: 500px;
        background-color: var(--billy-color-background-light);
        color: var(--billy-color-text-primary-dark);
        border: 2px solid var(--billy-color-border-loginbutton);
        font-size: 20px;
        padding: 0 20px;
        border-radius: 100px;
      }

      .redirect__link {
        margin-top: 10px;
        color: var(--billy-color-text-primary-light);
        font-size: 13px;
      }

      .redirect__link--show {
        display: inline-block;
      }

      .field__button {
        background-color: var(--billy-color-background-dark);
        border: 2px solid var(--billy-color-border-loginbutton);
        color: var(--billy-color-text-primary-light);
        height: 100%;
        margin: 0;
        width: 540px;
        font-size: 20px;
        font-weight: bold;
        padding: 0 20px;
        border-radius: 100px;
        cursor: pointer;
      }

      @media (max-width: 850px), (pointer: coarse) {
        :host {
          display: block;
          max-width: 90vw;
        }

        .field {
          width: 100%;
        }

        .field__input {
          width: calc(100% - 40px);
        }
      }
    `;
  }

  render() {
    return html`
      <form>
        <div class="wrapper">
          <div class="field">
            <input
              @keyup="${this.handleKeyUp}"
              aria-label="e-mail"
              placeholder="E-mail"
              class="field__input"
              id="email--input"
              type="email"
              required
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="field">
            <input
              @keyup="${this.handleKeyUp}"
              aria-label="wachtwoord"
              placeholder="Wachtwoord"
              class="field__input"
              id="password--input"
              type="password"
              required
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="field">
            <button class="field__button" @click="${this.login}" type="button">Inloggen</button>
          </div>
        </div>
      </form>
    `;
  }

  login() {
    const emailInput = this.shadowRoot.querySelector("#email--input").value;
    const passwordInput = this.shadowRoot.querySelector("#password--input").value;

    logIn({ email: emailInput, password: passwordInput })
      .then((data) => {
        window.localStorage.setItem("data", JSON.stringify(data));
        store.dispatch(actions.login({ loggedIn: true, user: data }));
        Router.go("/");
      })
      .catch((e) => alert(e.message));
  }

  handleKeyUp(e) {
    if (e.key === "Enter") {
      this.login();
    }
  }
}

defineElement("billy-login-window", LoginWindow);
