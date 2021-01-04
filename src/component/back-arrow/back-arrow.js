import { LitElement, html, css } from "lit-element";

class BackArrow extends LitElement {
  static getStyles() {
    return css`
      .backArrow {
        display: inline-block;
        height: 50px;
        width: 70px;
      }

      .backArrow__image {
        height: 50px;
      }
    `;
  }

  render() {
    return html`
      <a class="backArrow" href="index.html">
        <img
          class="backArrow__image"
          src="../../assets/icon/backarrow-icon.svg"
        />
      </a>
    `;
  }
}

window.customElements.define("billy-back-arrow", BackArrow);
