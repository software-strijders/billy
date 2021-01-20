import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

import { defineElement } from "../../js/custom-element";

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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
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

      .hero__footerButton {
        display: none;
      }


      @media (max-width: 850px) {
        :host {
          height: 100vh;
        }

        .hero__logo {
          font-size: 80px;
        }

        .hero__underTitle {
          font-size: 20px;
        }

        .hero__footerText {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
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
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  _scrollToBottom() {
    window.scrollTo(0 , document.body.scrollHeight);
  }
}

defineElement("billy-hero", Hero);
