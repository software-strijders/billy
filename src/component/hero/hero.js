import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

class Hero extends LitElement {
  constructor() {
    super();

    this.hideCategoryTitle = false;
  }

  static get properties() {
    return {
      hideCategoryTitle: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100%;
        background: var(--billy-gradient-background-brand);
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
      }

      .hero__header {
        width: 100%;
      }

      .hero__contentWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .hero__content {
        width: var(--billy-hero-content-width);
        margin: 0 0 var(--billy-hero-content-margin-offset) 0;
      }

      .hero__logo {
        margin: 0;
        font-size: 125px;
        color: var(--billy-color-text-primary-light);
        text-align: center;
        user-select: none;
        text-shadow: var(--billy-text-shadow);
      }

      .hero__underTitle {
        font-size: 25px;
        margin: 0 0 50px 0;
        user-select: none;
        color: var(--billy-color-text-primary-light);
        text-align: center;
        font-weight: normal;
      }

      .hero__footerText {
        position: absolute;
        bottom: 0;
      }

      .hero__categoryTitle {
        color: var(--billy-color-text-primary-light);
        user-select: none;
      }

      .hero__categoryTitle--hide {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <div class="hero__header">
        <slot name="header"></slot>
      </div>
      <div class="hero__contentWrapper">
        <div class="hero__content">
          <h1 class="hero__logo">Billy</h1>
          <p class="hero__underTitle">Sustainable development tools</p>
          <slot name="content"></slot>
        </div>
        <div class="hero__footerText">
          <h2
            class="hero__categoryTitle ${classMap({
              "hero__categoryTitle--hide": this.hideCategoryTitle,
            })}"
            slot="text"
          >
            Of zie de categoriëen
          </h2>
        </div>
      </div>
    `;
  }
}

window.customElements.define("billy-hero", Hero);
