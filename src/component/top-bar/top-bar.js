import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js"

import "../contrast-toggle/contrast-toggle.js";
import "../search-bar/search-bar.js";
import "../login-button/login-button.js";

class TopBar extends LitElement {
  static get properties() {
    return {
      hero: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      @import "../component/top-bar/top-bar.css";
    `;
  }

  render() {
    return html`
      <nav class="topBar ${classMap({ "topBar--hero": this.hero })}">
        <ul class="topBar__list">
          <li class="topBar__item">
            <a class="topBar__logo" href="/">Billy</a>
          </li>
          <li class="topBar__item topBar__item--right">
            <slot name="item"></slot>
          </li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define("billy-top-bar", TopBar);

          // <li class="topBar__item">
          //   <billy-contrast-toggle></billy-contrast-toggle>
          // </li>
          // <li class="topBar__item">
          //   <billy-search-bar hideLink="true"></billy-search-bar>
          // </li>
          // <li class="topBar__item topBar__item--last">
          //   <billy-login-button large="true"></billy-login-button>
          // </li>