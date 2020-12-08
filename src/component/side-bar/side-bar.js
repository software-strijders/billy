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
        height: calc(100% - 20px);
        width: 100%;
        padding: 10px;
        overflow: hidden;
        text-align: center;
        background: var(--billy-color-side-bar);
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
      }

      .item {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 30px;
        color: var(--billy-color-dark);
        text-decoration: none;
      }

      .item__image {
        width: 90%;
      }

      .item__image {
        text-align: center;
        display: block;
      }
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
