import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      href: { type: String },
      readTime: { type: Number },
      lastRevised: { type: String },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
        width: 100%;
        height: auto;
        cursor: pointer;
      }

      .resultItem__link {
        text-decoration: none;
        color: black;
      }

      .resultItem__title {
        color: var(--billy-color-result-item);
        margin: 0 0 0 0;
      }

      .resultItem__description {
        color: var(--billy-color-font-light);
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
