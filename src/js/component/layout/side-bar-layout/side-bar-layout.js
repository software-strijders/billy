import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../../custom-element";

class SideBarLayout extends LitElement {
  static get properties() {
    return {
      editingPage: { type: Boolean },
    };
  }

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
        width: 100%;
      }

      .sideBarLayout__contentWrapper {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        max-width: var(--billy-max-content-width);
      }

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

      @media(max-width: 850px), (pointer: coarse) {
        .sideBarLayout__sideBar {
          display: none;
        }

        .sideBarLayout__content--editPage .sideBarLayout__main {
          width: 100vw;
        }

        .sideBarLayout__content--editPage .sideBarLayout__contentWrapper {
          width: calc(100vw - 50px);
          padding: 25px;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="sideBarLayout__sideBar">
        <slot name="side-bar"></slot>
      </div>
      <div class="sideBarLayout__content ${classMap({ "sideBarLayout__content--editPage": this.editingPage })}">
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
