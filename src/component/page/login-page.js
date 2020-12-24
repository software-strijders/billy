import { LitElement, html } from "lit-element";

class LoginPage extends LitElement {
  render() {
    return html`
      <billy-app>
        <billy-full-page-layout slot="page-layout">
          <billy-hero hideCategoryTitle="true" slot="content">
            <billy-top-bar hero="true" slot="header">
              <billy-contrast-toggle slot="item" style="margin: 0 15px 0 0"></billy-contrast-toggle>
            </billy-top-bar>
            <billy-login-window slot="content"></billy-login-window>
          </billy-hero>
        </billy-full-page-layout>
      </billy-app>
    `
  }
}

window.customElements.define("billy-login-page", LoginPage);
