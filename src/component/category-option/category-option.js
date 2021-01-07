import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

const subCategoryOptions = {
  interaction: "Gebruikersinteractie",
  organizationProcess: "Organisatie processen",
  infrastructure: "Infrastructuur",
  software: "Software",
  hardwareInterfacing: "Hardware interfacing",
};

class CategoryOption extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
      text: { type: String },
      sideBar: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
      }

      .category {
        text-decoration: none;
        color: var(--billy-color-text-primary-dark);
      }

      .category--sideBar {
        font-size: 13px;
        margin: 20px;
      }

      .category--sideBar .category__image {
        height: 60px;
        width: 60px;
      }

      .category__image {
        height: 80px;
        width: 80px;
        filter: invert(var(--billy-filter-invert));
      }

      .category__text {
        text-align: center;
        font-weight: bold;
        color: var(--billy-te);
      }

      .popOut {
        position: absolute;
        bottom: 240px;
        width: 200px;
        padding: 20px;
        background-color: var(--billy-color-background-popout);
        border-radius: 10px;
        box-shadow: var(--billy-box-shadow);
        transition: 0.25s;
        opacity: 0;
        transform: scale(1.025);
        visibility: hidden;
        z-index: 1;
      }

      :host(:hover) .popOut {
        visibility: visible;
        transform: translateY(30px) scale(1);
        opacity: 1;
        border: var(--billy-color-border-pop-out) 2px solid;
      }

      .popOut--sideBar {
        bottom: 280px;
        margin: 0 0 -385px 385px;
      }

      .popOut--sideBar .popOut__pointerContainer {
        transform: rotate(90deg);
        top: 30px;
        left: -130px;
        height: 20px;
      }

      .popOut__option {
        margin: 0 0 15px 0;
      }

      .popOut__link {
        text-decoration: none;
        color: var(--billy-color-text-popout-link);
        font-weight: bold;
      }

      .popOut__line {
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-pop-out-line);
      }

      .popOut__pointerContainer {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 0 0 -19px 0;
      }

      .popOut__pointer {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: var(--billy-border-top-pop-out-pointer);
      }
    `;
  }

  render() {
    return html`
      <div class="popOut ${classMap({ "popOut--sideBar": this.sideBar })}">
        <div class="popOut__option">
          <a
            href="/search?hc=${this.text}&sc=${subCategoryOptions.interaction}"
            class="popOut__link"
            >${subCategoryOptions.interaction}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this
              .text}&sc=${subCategoryOptions.organizationProcess}"
            class="popOut__link"
            >${subCategoryOptions.organizationProcess}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this
              .text}&sc=${subCategoryOptions.infrastructure}"
            class="popOut__link"
            >${subCategoryOptions.infrastructure}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this.text}&sc=${subCategoryOptions.software}"
            class="popOut__link"
            >${subCategoryOptions.software}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this
              .text}&sc=${subCategoryOptions.hardwareInterfacing}"
            class="popOut__link"
            >${subCategoryOptions.hardwareInterfacing}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__pointerContainer">
          <div class="popOut__pointer"></div>
        </div>
      </div>
      <a
        class="category ${classMap({
          "category--sideBar": this.sideBar,
        })}"
        href="/search?hc=${this.text}"
      >
        <div>
          <img alt="" class="category__image" src="${this.icon}" />
          <p class="category__text">${this.text}</p>
        </div>
      </a>
    `;
  }
}

customElements.define("billy-category-option", CategoryOption);
