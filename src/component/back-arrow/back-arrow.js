import { LitElement, html, css } from "lit-element";

class BackArrow extends LitElement {
  static getStyles() {
    return css`
      .backArrow {
        display: inline-block;
        height: 50px;
        width: 70px;
        transition: 0.1s;
        margin-left: 10px;
      }

      .backArrow:hover {
        transform: translateX(-10px);
      }

      .backArrow__image {
        height: 50px;
      }
    `;
  }

  render() {
    return html`
      <a class="backArrow" href="/">
        <img
          class="backArrow__image"
          src="../../assets/icon/backarrow-icon.svg"
        />
      </a>
    `;
  }
}

window.customElements.define("billy-back-arrow", BackArrow);
