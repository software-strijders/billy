import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class ContrastToggle extends LitElement {
  constructor() {
    super();

    this.on = localStorage.getItem("high-contrast") === "true";
    this.updated();
  }

  static get properties() {
    return {
      on: { type: Boolean },
    };
  }

  updated(on) {
    if (this.on) {
      document.documentElement.classList.add("contrast");
      localStorage.setItem("high-contrast", true);
    } else {
      document.documentElement.classList.remove("contrast");
      localStorage.setItem("high-contrast", false);
    }
  }

  static getStyles() {
    return css`
      .contrastToggle {
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        cursor: pointer;
        overflow: none;
        transition: 0.3s;
        display: flex;
        align-items: center;
        background-color: var(--billy-color-background-dark);
        height: 30px;
        width: 60px;
        border-radius: 100px;
      }

      .contrastToggle__slider {
        cursor: pointer;
        height: 30px;
        transition: 0.3s;
        width: 30px;
        transform: translateX(-5px);
        margin-right: auto;
        background-color: black;
        border: 4px solid var(--billy-color-background-dark);
        border-radius: 100px;
      }

      .contrastToggle__fill {
        display: flex;
        align-items: center;
        transition: 0.25s;
        width: 20px;
        border-radius: 40px;
        height: 100%;
        background-color: var(--billy-color-background-contrast-button-light);
      }

      .contrastToggle--on .contrastToggle__fill {
        width: 100%;
      }

      .contrastToggle--on .contrastToggle__slider {
        transform: translateX(25px);
      }

      .contrastToggle--on .contrastToggle__sliderIcon {
        transform: rotate(180deg);
      }

      .contrastToggle__sliderIcon {
        transition: 0.25s;
        width: 30px;
        user-select: none;
      }
    `;
  }

  render() {
    return html`
      <div
        class="contrastToggle ${classMap({
          "contrastToggle--on": this.on,
        })}"
        name="Contrast toggle"
        @click="${this.toggleSwitch}"
      >
        <div class="contrastToggle__fill">
          <div class="contrastToggle__slider">
            <img alt="" class="contrastToggle__sliderIcon" src="/dist/assets/icon/contrast-icon.svg" />
          </div>
        </div>
      </div>
    `;
  }

  toggleSwitch() {
    this.on = !this.on;
  }
}

customElements.define("billy-contrast-toggle", ContrastToggle);
