import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

class CategoryOption extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      icon: { type: String },
      text: { type: String },
      sideBar: { type: Boolean },
    };
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

      .category--sideBar {
        font-size: 13px;
        margin: 20px;
      }

      .category--sideBar .category__image {
        height: 60px;
        width: 60px;
      }
    `;
  }

  render() {
    return html`
      <a class="category ${classMap({
        "category--sideBar": this.sideBar,
      })}" ClassMap href="${this.href}">
        <div>
          <img alt="" class="category__image" src="${this.icon}"></img>
          <p class="category__text">${this.text}</p>
        </div>
      </a>
    `;
  }
}

customElements.define("billy-category-option", CategoryOption);
