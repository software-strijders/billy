import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class ContrastToggle extends LitElement {
  constructor() {
    super();

    this.on = false;
  }

  static get properties() {
    return {
      on: { type: Boolean }
    }
  }

  static getStyles() {
    return css`
      @import "../component/contrast-toggle/contrast-toggle.css";
    `;
  }

  render() {
    return html`
      <div class="contrastToggle" @click="${this.toggleSwitch}">
        <div class="contrastToggle__slider ${classMap({ "contrastToggle__slider--on": this.on })}"></div>
      </div>
    `;
  }

  toggleSwitch() {
    this.on = !this.on;
  }
}

customElements.define("billy-contrast-toggle", ContrastToggle);
