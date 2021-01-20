import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../custom-element";

class BackArrow extends LitElement {
  static getStyles() {
    return css`
      .backArrow {
        display: flex;
        align-items: center;
        height: 70px;
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

      @media (max-width: 850px), (pointer: coarse) {
        .backArrow__image {
          width: 50px;
          height: 50px;
        }
      }
    `;
  }

  render() {
    return html`
      <a class="backArrow" href="/" aria-label="Ga terug naar vorige pagina">
        <img aria-hidden="true" class="backArrow__image" src="/dist/assets/icon/back-arrow-icon.svg" alt="" />
      </a>
    `;
  }
}

defineElement("billy-back-arrow", BackArrow);
