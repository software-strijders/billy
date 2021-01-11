import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

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
        position: relative;
        display: flex;
        flex-direction: row;
        margin: 25px 0;
        width: 100%;
        height: auto;
        transition: 0.3s;
        border-radius: 5px;
      }

      :host(:hover) {
        background-color: var(--billy-color-background-light-grey)
      }

      :host(:hover) .line {
        min-width: 5px;
        margin: 0 10px 0 0;
        transform: translateX(0);
        opacity: 1;
      }

      :host(:hover) .resultItem {
        transform: translateX(15px);
        
      }

      :host(:hover) .resultItem__description {
        color: var(--billy-color-text-secondary-dark);
      }

      .line {
        position: absolute;
        height: 100%;
        min-width: 3px;
        background-color: var(--billy-color-line-light);
        border-radius: 10px;
        transform: translateX(-5px);
        transition: 0.1s;
        opacity: 0;
      }

      .resultItem {
        transition: 0.1s;
        padding: 5px;
        border-radius: 5px;
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
        width: 98%;
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
        background-color: var(--billy-color-background-grey);
        color: var(--billy-color-text-primary-dark);
        text-decoration: none;
        border-radius: 20px;
        border: var(--billy-color-border-category);
        margin: 0 10px 0 0;
        padding: 5px 10px;
        cursor: select;
        font-size: 15px;
      }

      .resultItem__info {
        margin-top: 5px;
        color: var(--billy-color-text-primary-dark);
      }
    `;
  }

  render() {
    return html`
      <div class="line"></div>
      <div class="resultItem">
        <div class="resultItem__categories">
          <a class="resultItem__category" href="/search?hc=${this.headCategory}">${this.headCategory}</a>
          <a class="resultItem__category" href="/search?sc=${this.subCategory}">${this.subCategory}</a>
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
      </div>
    `;
  }
}

window.customElements.define("billy-result-item", ResultItem);
