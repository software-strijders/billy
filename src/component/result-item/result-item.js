import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
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
        margin: 25px 0;
        width: 100%;
        height: auto;
      }

      .resultItem__link {
        text-decoration: none;
        color: black;
      }

      .resultItem__title {
        color: var(--billy-color-text-primary-dark);
        margin: 0 0 0 0;
      }

      .resultItem__description {
        color: var(--billy-color-text-secondary-dark);
        margin: 0;
        height: auto;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .resultItem__categories {
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: flex-start;
      }

      .resultItem__category {
        background-color: var(--billy-color-background-light-grey);
        border-radius: 20px;
        margin: 0 10px 0 0;
        padding: 5px 10px;
        cursor: select;
        font-size: 15px;
      }
    `;
  }

  render() {
    return html`
      <div class="resultItem__categories">
        <p class="resultItem__category">${this.headCategory}</p>
        <p class="resultItem__category">${this.subCategory}</p>
      </div>
      <a class="resultItem__link" href="${this.href}">
        <h2 class="resultItem__title">${this.title}</h2>
        <p class="resultItem__description">
          <small>${this.description} </small>
        </p>
        <div class="resultItem__info">
          tijd: ${this.readTime} min - laatst gewijzigd: ${this.lastRevised}
        </div>
      </a>
    `;
  }
}

window.customElements.define("billy-result-item", ResultItem);
