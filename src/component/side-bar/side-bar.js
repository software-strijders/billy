import { LitElement, html, css } from "lit-element";

class SideBar extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .sideBar {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: center;
        background: var(--billy-color-background-light-grey);
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        border-right: var(--billy-border-right);
        border-left: var(--billy-border-left);
        z-index: 1;
      }
    `;
  }

  render() {
    return html`
      <nav aria-label="Category menu" class="sideBar">
        <billy-category-option
          style="height: unset"
          text="Analyse"
          icon="/dist/assets/icon/analyse-icon.svg"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Advies"
          icon="/dist/assets/icon/advice-icon.svg"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Ontwerp"
          icon="/dist/assets/icon/design-icon.svg"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Realisatie"
          icon="/dist/assets/icon/realize-icon.svg"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Beheer"
          icon="/dist/assets/icon/manage-icon.svg"
          sidebar
        ></billy-category-option>
      </nav>
    `;
  }
}

window.customElements.define("billy-side-bar", SideBar);
