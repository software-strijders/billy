import { LitElement, html } from "lit-element";

class CreatePage extends LitElement {
  render() {
    return html`
      <billy-app>
        <billy-top-bar slot="header">
          <billy-contrast-toggle slot="item"></billy-contrast-toggle>
          <billy-search-bar hideLink="true" slot="item"></billy-search-bar>
          <billy-login-button large="true" slot="item"></billy-login-button>
        </billy-top-bar>
        <billy-side-bar-layout slot="page-layout">
          <billy-side-bar slot="side-bar"></billy-side-bar>
          <billy-editing-page slot="content"></billy-editing-page>
        </billy-side-bar-layout>
      </billy-app>
    `;
  }
}

window.customElements.define("billy-create-page", CreatePage);
