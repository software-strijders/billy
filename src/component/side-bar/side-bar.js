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
        background: var(--billy-color-side-bar);
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
      }
    `;
  }

  render() {
    return html`
      <nav aria-label="Category menu" class="sideBar">
        <billy-category-option
          style="height: unset"
          text="Analyse"
          icon="./assets/icon/analyse-icon.svg"
          href="./analyse.html"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Advies"
          icon="./assets/icon/advice-icon.svg"
          href="./advice.html"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Ontwerp"
          icon="./assets/icon/design-icon.svg"
          href="./design.html"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Realisatie"
          icon="./assets/icon/realize-icon.svg"
          href="./realize.html"
          sidebar
        ></billy-category-option>
        <billy-category-option
          style="height: unset"
          text="Beheer"
          icon="./assets/icon/manage-icon.svg"
          href="./manage.html"
          sidebar
        ></billy-category-option>
      </nav>
    `;
  }
}

window.customElements.define("billy-side-bar", SideBar);
