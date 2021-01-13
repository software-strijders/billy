import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../../js/custom-element";

class SideBarLayout extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: flex;
        height: calc(100% - var(--billy-height-topbar));
        width: 100%;
        transition: 0.3s;
      }

      .sideBarLayout__sideBar {
        width: var(--billy-width-side-bar);
      }

      .sideBarLayout__content {
        display: grid;
        grid-template-columns: var(--billy-grid-template-columns-article);
        grid-template-rows: var(--billy-grid-template-rows-article);
        height: 100%;
        width: 100%;
        overflow: auto;
        background-color: var(--billy-color-background-light);
      }

      .sideBarLayout__filler {
        height: 100%;
      }

      .sideBarLayout__main {
        display: flex;
        justify-content: center;
      }

      .sideBarLayout__contentWrapper {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        max-width: var(--billy-max-content-width);
      }

      /* 
        TODO: We should define a few of these pixel widths.
        Not sure what would be the best, though. 
      */
      @media screen and (max-width: 1250px) {
        .sideBarLayout__content {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
        }

        .sideBarLayout__filler:first-child {
          display: none;
        }

        .sideBarLayout__contentWrapper {
          padding: 25px;
        }
      }

      @media(max-width: 850px) {
        .sideBarLayout__sideBar {
          display: none;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="sideBarLayout__sideBar">
        <slot name="side-bar"></slot>
      </div>
      <div class="sideBarLayout__content">
        <div class="sideBarLayout__filler"></div>
        <main class="sideBarLayout__main">
          <div class="sideBarLayout__contentWrapper">
            <slot name="content"></slot>
          </div>
        </main>
        <aside class="sideBarLayout__filler">
          <slot name="aside"></slot>
        </aside>
      </div>
    `;
  }
}

defineElement("billy-side-bar-layout", SideBarLayout);
