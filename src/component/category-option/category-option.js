import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

import { defineElement } from "../../js/custom-element";

const subCategoryOptions = {
  interaction: "Gebruikersinteractie",
  organizationProcess: "Organisatie processen",
  infrastructure: "Infrastructuur",
  software: "Software",
  hardwareInterfacing: "Hardware interfacing",
};

class CategoryOption extends LitElement {
  constructor() {
    super();

    this.collapsed = true;
  }

  static get properties() {
    return {
      icon: { type: String },
      text: { type: String },
      sideBar: { type: Boolean },
      collapsed: { type: Boolean },
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

      .category__link {
        display: flex;
        flex-direction: column;
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
        border: var(--billy-border);
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
        background-color: var(--billy-color-line-popout);
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
        border-top: var(--billy-border-top-pointer-popout);
      }

      .category__dropdown {
        display: none;
      }

      .category__wrapper {
        display: flex;
        text-decoration: none;
        flex-direction: column;
        color: var(--billy-color-text-primary-dark);
      }

      .slideOut {
        display: none;
      }

      @media (max-width: 850px) {
        .category__container {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
        }

        .category {
          width: 100%;
          height: auto;
          border-bottom: 5px solid var(--billy-color-line-light);
          margin: 25px 25px 10px;
        }

        .category__link {
          flex-direction: row;
        }

        .category--collapsed {
          height: 100px;
          border-bottom: none;
        }

        .category__text {
          margin-left: 40px;
          font-size: 20px;
        }
        .category__option__wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .category__dropdownImage {
          height: 35px;
          transition: 0.1s;
          transform: rotate(180deg);
          filter: invert(var(--billy-filter-invert));
        }

        .category__dropdown {
          display: flex;
          width: 65px;
          height: 65px;
          background-color: var(--billy-color-background-light-grey);
          justify-content: center;
          align-items: center;
          border: var(--billy-border);
          margin: 0 15px 0 auto;
          border-radius: 5px;
          transition: 0.1s;
        }

        .category--collapsed .category__dropdownImage {
          transform: rotate(0);
        }

        .category--collapsed .slideOut {
          display: none;
        }

        .slideOut {
          display: flex;
          height: auto;
        }

        .slideOut__list {
          list-style-type: none;
        }

        .slideOut__listOption {
          margin: 30px 0;
          font-weight: bold;
          font-size: 20px;
        }

        .slideOut__link {
          color: var(--billy-color-text-primary-dark);
        }

        :host {
          width: 100%;
          justify-content: start;
          height: auto;
          align-items: start;
        }

        .popOut {
          display: none;
        }
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
            href="/search?hc=${this.text}&sc=${subCategoryOptions.organizationProcess}"
            class="popOut__link"
            >${subCategoryOptions.organizationProcess}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this.text}&sc=${subCategoryOptions.infrastructure}"
            class="popOut__link"
            >${subCategoryOptions.infrastructure}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a href="/search?hc=${this.text}&sc=${subCategoryOptions.software}" class="popOut__link"
            >${subCategoryOptions.software}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__option">
          <a
            href="/search?hc=${this.text}&sc=${subCategoryOptions.hardwareInterfacing}"
            class="popOut__link"
            >${subCategoryOptions.hardwareInterfacing}</a
          >
          <hr class="popOut__line" />
        </div>
        <div class="popOut__pointerContainer">
          <div class="popOut__pointer"></div>
        </div>
      </div>

      <div
        class="category ${classMap({
          "category--sideBar": this.sideBar,
          "category--collapsed": this.collapsed,
        })}"
        href="/search?hc=${this.text}"
      >
        <div class="category__container">
          <a class="category__link" href="/search?hc=${this.text}">
            <img alt="" class="category__image" src="${this.icon}" />
            <p class="category__text">${this.text}</p>
          </a>
          <button aria-label="Categorie uitklappen" @click=${this._changeCollapsed} class="category__dropdown">
            <img alt="" src="/dist/assets/icon/select-dropdown.svg" class="category__dropdownImage" />
          </button>
        </div>

        <div class="slideOut">
          <ul class="slideOut__list">
            <li class="slideOut__listOption">
              <a
                class="slideOut__link"
                href="/search?hc=${this.text}&sc=${subCategoryOptions.interaction}"
                >${subCategoryOptions.interaction}</a
              >
            </li>
            <li class="slideOut__listOption">
              <a
                class="slideOut__link"
                href="/search?hc=${this.text}&sc=${subCategoryOptions.organizationProcess}"
                >${subCategoryOptions.organizationProcess}</a
              >
            </li>
            <li class="slideOut__listOption">
              <a
                class="slideOut__link"
                href="/search?hc=${this.text}&sc=${subCategoryOptions.infrastructure}"
                >${subCategoryOptions.infrastructure}</a
              >
            </li>
            <li class="slideOut__listOption">
              <a
                class="slideOut__link"
                href="/search?hc=${this.text}&sc=${subCategoryOptions.software}"
                >${subCategoryOptions.software}</a
              >
            </li>
            <li class="slideOut__listOption">
              <a
                class="slideOut__link"
                href="/search?hc=${this.text}&sc=${subCategoryOptions.hardwareInterfacing}"
                >${subCategoryOptions.hardwareInterfacing}</a
              >
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  _changeCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

defineElement("billy-category-option", CategoryOption);
