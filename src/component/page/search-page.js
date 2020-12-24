import { LitElement, html } from "lit-element";

class SearchPage extends LitElement {
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
            <!-- TODO: This should be its own component -->
            <div slot="content" class="result">
              <h1 class="result__title">Results for: %s</h1>
              <hr class="result__hr"/>
              <div class="result__items">
                <billy-result-item href="/article"></billy-result-item>
                <billy-result-item href="/article"></billy-result-item>
                <billy-result-item href="/article"></billy-result-item>
                <billy-result-item href="/article"></billy-result-item>
                <billy-result-item href="/article"></billy-result-item>
              </div>
            </div>
        </billy-side-bar-layout>
      </billy-app>
    `
  }
}

window.customElements.define("billy-search-page", SearchPage);
