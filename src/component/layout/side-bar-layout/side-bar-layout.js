import { LitElement, html, css } from "lit-element";

class SideBarLayout extends LitElement {
  static getStyles() {
    return css`
      @import "../component/layout/side-bar-layout/side-bar-layout.css";
    `;
  }

  render() {
    return html`
      <div class="sideBarLayout__sideBar">
        <slot name="side-bar"></slot>
      </div>
      <div class="sideBarLayout__content">
        <div class="sideBarLayout__filler"></div>
        <div class="sideBarLayout__main">
          <div class="sideBarLayout__contentWrapper">
            <slot name="content"></slot>
          </div>
        </div>
        <aside class="sideBarLayout__filler">
          <slot name="aside"></slot>
        </aside>
      </div>
    `;
  }
}

window.customElements.define("billy-side-bar-layout", SideBarLayout);
