import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../custom-element";

class NoResultItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      href: { type: String },
      readTime: { type: Number },
      lastRevised: { type: String },
      headCategory: { type: String },
      subCategory: { type: String },
    };
  }

  static getStyles() {
    return css`
      .noResultItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0;
        width: 100%;
        user-select: none;
        height: auto;
      }

      .noResultItem__title {
        color: var(--billy-color-text-secondary-dark);
        font-size: 300px;
        margin: 10px 0;
      }

      .noResultItem__description {
        color: var(--billy-color-text-secondary-dark);
        font-size: 50px;
        margin: 0;
        height: auto;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      @media (max-width: 850px), (pointer: coarse) {
        .noResultItem__title {
          font-size: 50px;
        }

        .noResultItem__description {
          font-size: 25px;
        }
      }
    `;
  }

  render() {
    return html`
      <article class="noResultItem">
        <header>
          <h2 class="noResultItem__title">404</h2>
        </header>
        <p class="noResultItem__description">No results found</p>
      </article>
    `;
  }
}

defineElement("billy-no-result", NoResultItem);
