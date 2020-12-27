import { LitElement, html, css } from "lit-element";

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
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0;
        width: 100%;
        user-select: none;
        height: auto;
      }

      .noResultItem__title {
        color: var(--billy-color-grey);
        font-size: 300px;
        margin: 10px 0;
      }

      .noResultItem__description {
        color: var(--billy-color-grey);
        font-size: 50px;
        margin: 0;
        height: auto;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `;
  }

  render() {
    return html`
      <h2 class="noResultItem__title">404</h2>
      <p class="noResultItem__description">No results found</p>
    `;
  }
}

window.customElements.define("billy-no-result", NoResultItem);