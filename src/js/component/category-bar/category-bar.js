import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../custom-element";

class CategoryBar extends LitElement {
  static get styles() {
    return css`
      .categoryBar {
        position: relative;
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
        grid-gap: 10px;
        justify-items: center;
        align-items: center;
        background-color: var(--billy-color-background-light);
        width: 100%;
        height: 200px;
        margin-top: auto;
        border: var(--billy-border-categorybar);
        border-width: var(--billy-border-width-categorybar);
      }

      @media(max-width: 1280px) {
        .categoryBar {
          height: 150px;
        }
      }

      @media(max-width: 850px), (pointer: coarse) {
        :host {
          display: block;
          width: 100%;
        }

        .categoryBar {
          display: flex;
          flex-direction: column;
          height: auto;
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
