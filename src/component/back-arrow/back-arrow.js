import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../js/custom-element";

class BackArrow extends LitElement {
  static getStyles() {
    return css`
      .backArrow {
        display: flex;
        align-items: center;
        height: 50px;
        width: 70px;
        transition: 0.1s;
        margin-left: 10px;
      }

      .backArrow:hover {
        transform: translateX(-10px);
      }

      .backArrow__image {
        height: 100%;
      }

      @media(max-width: 850px) {
        .backArrow__image {
          width: 35px;
          height: 35px;
        }
      }
    `;
  }

  render() {
    return html`
      <a class="backArrow" href="/" aria-label="Ga terug naar vorige pagina">
        <img
          class="backArrow__image"
          src="/dist/assets/icon/backarrow-icon.svg"
          alt=""
          />
      </a>
    `;
  }
}

defineElement("billy-back-arrow", BackArrow);
