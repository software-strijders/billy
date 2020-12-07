import { LitElement, html, css } from "lit-element";

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
        border: none;
        font-size: 20px;
        padding: 0 20px;
        border-radius: 100px;
      }

      .register__link {
        margin-top: 10px;
        color: white;
        font-size: 13px;
      }

      .register__link--show {
        display: inline-block;
      }

      .field__button {
        background-color: var(--billy-color-dark);
        color: var(--billy-color-white);
        height: 100%;
        margin: 0;
        width: 540px;
        border: none;
        font-size: 20px;
        padding: 0 20px;
        border-radius: 100px;
        cursor: pointer;
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="field">
          <input
            aria-label="e-mail"
            placeholder="E-mail"
            class="field__input"
            type="text"
          />
        </div>
      </div>

      <div class="wrapper">
        <div class="field">
          <input
            aria-label="wachtwoord"
            placeholder="Wachtwoord"
            class="field__input"
            type="password"
          />
        </div>
      </div>

      <div class="wrapper">
        <div class="field">
          <button class="field__button" onclick="">Inloggen</button>
        </div>
        <a class="register__link register__link--show" href="">Nog geen account? Registreer hier</a>
      </div>
    `;
  }
}

customElements.define("billy-login-window", LoginWindow);
