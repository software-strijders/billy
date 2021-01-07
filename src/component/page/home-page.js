import { LitElement, html, css } from "lit-element";

import { store } from "../../js/state/store.js";

class HomePage extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
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
              ${store.getState().login.loggedIn
                ? html`<billy-contribute-button slot="item"></billy-contribute-button>`
                : html``
              }
              <billy-login-button slot="item" large="true"></billy-login-button>
            </billy-top-bar>
            <billy-search-bar slot="content"></billy-search-bar>
          </billy-hero>
          <billy-category-bar slot="category-bar">
            <billy-category-option text="Analyse" icon="/dist/assets/icon/analyse-icon.svg"></billy-category-option>
            <billy-category-option text="Advies" icon="/dist/assets/icon/advice-icon.svg"></billy-category-option>
            <billy-category-option text="Ontwerp" icon="/dist/assets/icon/design-icon.svg"></billy-category-option>
            <billy-category-option text="Realisatie" icon="/dist/assets/icon/realize-icon.svg"></billy-category-option>
            <billy-category-option text="Beheer" icon="/dist/assets/icon/manage-icon.svg"></billy-category-option>
          </billy-category-bar>
        </billy-full-page-layout>
      </billy-app>
    `
  }
}

window.customElements.define("billy-home-page", HomePage);
