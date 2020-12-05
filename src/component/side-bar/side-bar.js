import { LitElement, html, css } from "lit-element";

class SideBar extends LitElement {
  static getStyles() {
    return css`
      @import "../component/side-bar/side-bar.css";
    `;
  }

  render() {
    return html`
        <div class="sideBar">
          <a href="./analyse.html" class="item">
            <img class="item__image" src="./assets/analyse-icon.svg" />
            Analyse
          </a>

          <a href="./advice.html" class="item">
            <img class="item__image" src="./assets/advice-icon.svg" />
            Advies
          </a>

          <a href="./design.html" class="item">
            <img class="item__image" src="./assets/design-icon.svg" />
            Ontwerp
          </a>

          <a href="./realize.html" class="item">
            <img class="item__image" src="./assets/realize-icon.svg" />
            Realisatie
          </a>

          <a href="./manage.html" class="item">
            <img class="item__image" src="./assets/manage-icon.svg" />
            Beheer
          </a>
        </div>
    `;
  }
}

window.customElements.define("billy-side-bar", SideBar);
