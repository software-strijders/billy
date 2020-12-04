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
      @import "./component/category-option/category-option.css";
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
