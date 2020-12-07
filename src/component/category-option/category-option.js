import { LitElement, html, css } from "lit-element";

class CategoryOption extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      icon: { type: String },
      text: { type: String },
    }
  }

  static getStyles() {
    return css`
      .category {
        text-decoration: none;
        color: var(--billy-color-font-dark);
      }

      .category__image {
        height: 80px;
        width: 80px;
      }

      .category__text {
        text-align: center;
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <a class="category" href="${this.href}">
        <div>
          <img class="category__image" src="${this.icon}"></img>
          <p class="category__text">${this.text}</p>
        </div>
      </a>
    `;
  }
}

customElements.define("billy-category-option", CategoryOption);
