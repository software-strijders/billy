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
      .contrastToggle {
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        align-items: center;
        background-color: var(--billy-color-dark);
        height: 30px;
        width: 60px;
        border-radius: 100px;
      }

      .contrastToggle__slider {
        cursor: pointer;
        height: 30px;
        transition: 0.3s;
        width: 30px;
        margin-right: auto;
        background-color: white;
        border: 2px solid var(--billy-color-dark);
        border-radius: 100px;
      }

      .contrastToggle__slider--on {
        transform: translateX(30px);
      }
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
