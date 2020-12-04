import { LitElement, html, css } from "lit-element";

// TODO: This is not really appropriate to be a component, it should be split into
// smaller components
class LoginWindow extends LitElement {
  static getStyles() {
    return css`
      @import "../component/login-window/login-window.css";
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
