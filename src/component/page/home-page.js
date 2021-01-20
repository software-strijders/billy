import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../js/custom-element";

class HomePage extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      .hero__footer {
        display: none;
      }

      @media (max-width: 850px), (pointer: coarse) {
        .hero__footer {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
        }
      }
    `;
  }

  render() {
    return html`
      <billy-app>
        <billy-full-page-layout slot="page-layout">
          <billy-hero slot="content">
            <billy-top-bar hero="true" slot="header">
              <billy-contrast-toggle slot="item"></billy-contrast-toggle>
              <billy-login-button slot="item" large="true"></billy-login-button>
            </billy-top-bar>
            <billy-search-bar slot="content"></billy-search-bar>
            <button aria-label="Naar categorieën" slot="footer" class="hero__footer" @click=${this._scrollToCategories}>
              <img alt="" src="/dist/assets/icon/scroll-icon.svg">
            </button>
          </billy-hero>
          <billy-category-bar id="categoryBar" slot="category-bar">
            <billy-category-option text="Analyse" icon="/dist/assets/icon/analyse-icon.svg"></billy-category-option>
            <billy-category-option text="Advies" icon="/dist/assets/icon/advice-icon.svg"></billy-category-option>
            <billy-category-option text="Ontwerp" icon="/dist/assets/icon/design-icon.svg"></billy-category-option>
            <billy-category-option text="Realisatie" icon="/dist/assets/icon/realize-icon.svg"></billy-category-option>
            <billy-category-option text="Beheer" icon="/dist/assets/icon/manage-icon.svg"></billy-category-option>
          </billy-category-bar>
        </billy-full-page-layout>
      </billy-app>
    `;
  }

  firstUpdated() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("jump")) {
      // The method doesn't work without it being wrapped into a setTimeout
      setTimeout(() => {
        this._scrollToCategories();
      }, 0);
    }
  }

  _scrollToCategories() {
    let bar = this.shadowRoot.querySelector("#categoryBar");
    bar.scrollIntoView({ block: "start", inline: "center", behavior: "smooth" });
  }
}

defineElement("billy-home-page", HomePage);
