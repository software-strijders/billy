import { LitElement, html, css } from "lit-element";

import { store } from "../../js/state/store.js";

class ArticlePage extends LitElement {
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
        <billy-top-bar slot="header">
          <billy-contrast-toggle slot="item"></billy-contrast-toggle>
          ${store.getState().login.loggedIn
            ? html`<billy-contribute-button slot="item"></billy-contribute-button>`
            : html``
          }
          <billy-search-bar hideLink="true" slot="item"></billy-search-bar>
          <billy-login-button large="true" slot="item"></billy-login-button>
        </billy-top-bar>
        <billy-side-bar-layout slot="page-layout">
          <billy-side-bar slot="side-bar"></billy-side-bar>
          <billy-article slot="content"></billy-article>
          <billy-aside slot="aside"></billy-aside>
        </billy-side-bar-layout>
      </billy-app>
    `
  }
}

window.customElements.define("billy-article-page", ArticlePage);
