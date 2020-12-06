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
    }
  }

  static getStyles() {
    return css`
      @import "../component/hero/hero.css";
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
          <h2 class="hero__underTitle">Sustainable development tools</h2>
          <slot name="content"></slot>
        </div>
        <div class="hero__footerText">
          <h2 class="hero__categoryTitle ${classMap({ "hero__categoryTitle--hide": this.hideCategoryTitle })}" slot="text">Of zie de categoriëen</h2>
        </div>
      </div>
    `;
  }
}

window.customElements.define("billy-hero", Hero);
