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
        background-color: var(--billy-color-background-light);
        width: 100%;
        height: 200px;
        margin-top: auto;
        border: var(--billy-border-category-bar-border);
        border-width: var(--billy-border-category-bar-border-width);
      }
    `;
  }

  render() {
    return html`
      <div class="categoryBar">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("billy-category-bar", CategoryBar);
