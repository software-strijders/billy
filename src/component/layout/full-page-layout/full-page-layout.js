import { LitElement, html, css } from "lit-element"

class FullPageLayout extends LitElement {
  static getStyles() {
    return css`
      @import "../component/layout/full-page-layout/full-page-layout.css";
    `;
  }

  render() {
    return html`
      <div class="fullPageLayout__content">
        <slot name="content"></slot>
      </div>
      <div class="fullPageLayout__categoryBar">
        <slot name="category-bar"></slot>
      </div>
    `;
  }
}

window.customElements.define("billy-full-page-layout", FullPageLayout);
