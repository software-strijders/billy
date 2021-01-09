import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../../js/custom-element";

class FullPageLayout extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-image: var(--billy-gradient);
      }

      main {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-image: var(--billy-gradient);
      }

      .fullPageLayout__content {
        flex: 1;
      }

      .fullPageLayout__categoryBar {
        width: 100%;
        margin: auto 0 0 0;
      }
    `;
  }

  render() {
    return html`
      <main>
        <div class="fullPageLayout__content">
          <slot name="content"></slot>
        </div>
      </main>
      <aside>
        <div class="fullPageLayout__categoryBar">
          <slot name="category-bar"></slot>
        </div>
      </aside>
    `;
  }
}

defineElement("billy-full-page-layout", FullPageLayout)
