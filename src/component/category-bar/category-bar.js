import { LitElement, html, css } from "lit-element";

class CategoryBar extends LitElement {
  static get styles() {
    return css`
      .categoryBar {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
        grid-gap: 10px;
        justify-items: center;
        align-items: center;
        background-color: var(--billy-color-white);
        width: 100%;
        height: 200px;
        margin-top: auto;
      }
    `;
  }

  render() {
    return html` 
    <div class="categoryBar">
      <slot></slot>
    </div> `;
  }
}

customElements.define("billy-category-bar", CategoryBar);
