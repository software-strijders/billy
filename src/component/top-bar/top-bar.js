import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

class TopBar extends LitElement {
  static get properties() {
    return {
      hero: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      ::slotted(*) {
        margin: 0 0 0 15px;
      }

      .topBar {
        position: relative;
        width: 100%;
        height: var(--billy-top-bar-height);
        background: var(--billy-gradient-background-brand);
        box-shadow: var(--billy-box-shadow-lighter);
        z-index: 1;
      }

      .topBar--hero {
        background: none;
        box-shadow: none;
      }

      .topBar--hero .topBar__logo {
        display: none;
      }

      .topBar__list {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .topBar__item {
        justify-content: center;
        align-items: flex-start;
        text-shadow: 0px 5px 10px var(--billy-color-shadow);
      }

      .topBar__item--right {
        display: flex;
        align-items: center;
        margin-left: auto;
      }

      .topBar__logo {
        color: var(--billy-color-text-primary-light);
        text-decoration: none;
        font-size: 45px;
        font-weight: bold;
        margin: 0 0 0 10px;
      }
    `;
  }

  render() {
    return html`
      <nav
        aria-label="Search menu"
        class="topBar ${classMap({ "topBar--hero": this.hero })}"
      >
        <ul class="topBar__list">
          <li class="topBar__item">
            <a class="topBar__logo" href="/">Billy</a>
            <slot name="backItem">
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
