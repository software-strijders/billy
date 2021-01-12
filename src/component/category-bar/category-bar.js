import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../js/custom-element";

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

      @media(max-width: 850px) {
        .categoryBar {
          display: flex;
          flex-direction: column;
          height: auto;
        }

        :host {
          display: block;
          width: 100%;
        }
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

defineElement("billy-category-bar", CategoryBar);
