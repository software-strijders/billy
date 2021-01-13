import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../js/custom-element";
import { store } from "../../js/state/store.js";

class LoginPage extends LitElement {
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
          <billy-hero hideCategoryTitle="true" slot="content">
            <billy-top-bar hero="true" slot="header">
              <billy-back-arrow slot="backItem"></billy-back-arrow>
              <billy-contrast-toggle slot="item" style="margin: 0 15px 0 0"></billy-contrast-toggle>
            </billy-top-bar>
            <billy-login-window slot="content"></billy-login-window>
          </billy-hero>
        </billy-full-page-layout>
      </billy-app>
    `
  }
}

defineElement("billy-login-page", LoginPage);
