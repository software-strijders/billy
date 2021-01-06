import { LitElement, html } from "lit-element";

class HomePage extends LitElement {
  render() {
    return html`
      <billy-app>
        <billy-full-page-layout slot="page-layout">
          <billy-hero slot="content">
            <billy-top-bar hero="true" slot="header">
              <billy-contrast-toggle slot="item"></billy-contrast-toggle>
              <billy-contribute-button slot="item"></billy-contribute-button>
              <billy-login-button slot="item"></billy-login-button>
            </billy-top-bar>
            <billy-search-bar slot="content"></billy-search-bar>
          </billy-hero>
          <billy-category-bar slot="category-bar">
            <billy-category-option text="Analyse" icon="/assets/icon/analyse-icon.svg" href="./analyse.html"></billy-category-option>
            <billy-category-option text="Advies" icon="/assets/icon/advice-icon.svg" href="./advice.html"></billy-category-option>
            <billy-category-option text="Ontwerp" icon="/assets/icon/design-icon.svg" href="./design.html"></billy-category-option>
            <billy-category-option text="Realisatie" icon="/assets/icon/realize-icon.svg" href="./realize.html"></billy-category-option>
            <billy-category-option text="Beheer" icon="/assets/icon/manage-icon.svg" href="./manage.html"></billy-category-option>
          </billy-category-bar>
        </billy-full-page-layout>
      </billy-app>
    `
  }
}

window.customElements.define("billy-home-page", HomePage);
