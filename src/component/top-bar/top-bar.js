import { LitElement, html, css } from "lit-element";

class TopBar extends LitElement {
  static getStyles() {
    return css`
      @import "../component/top-bar/top-bar.css";
    `;
  }

  render() {
    return html`
      <nav class="topBar">
        <ul class="topBar__list">
          <li class="topBar__item">
            <a class="topBar__text" href="/">Billy</a>
          </li>
          <li class="topBar__item topBar__item--right">
            <billy-contrast-toggle></billy-contrast-toggle>
          </li>
          <li class="topBar__item">
            <billy-search-bar hideLink="true"></billy-search-bar>
          </li>
          <li class="topBar__item topBar__item--last">
            <billy-login-button large="true"></billy-login-button>
          </li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define("billy-top-bar", TopBar);
