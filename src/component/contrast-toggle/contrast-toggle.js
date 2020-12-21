import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

class ContrastToggle extends LitElement {
  constructor() {
    super();

    this.on = false;
  }

  static get properties() {
    return {
      on: { type: Boolean },
    };
  }

  firstUpdated(on) {
    if (localStorage.getItem("high-contrast") === "true") {
      this.on = true;
      this.updated(this.on);
    }
  }

  updated(on) {
    if (this.on === true || this.on === "true") {   
      console.log("jup") 
    document.documentElement.style
    .setProperty('--billy-color-turquoise', '#000');
    document.documentElement.style
    .setProperty('--billy-color-blue', '#000');
    document.documentElement.style
    .setProperty('--billy-color-white', '#fff');
    document.documentElement.style
    .setProperty('--billy-color-gradient', '#000');
    localStorage.setItem("high-contrast", true);
    } else {
      console.log("nope")
    document.documentElement.style
    .setProperty('--billy-color-turquoise', '#4c74fc');
    document.documentElement.style
    .setProperty('--billy-color-blue', '#801be5');
    document.documentElement.style
    .setProperty('--billy-color-white', '#fff');
    document.documentElement.style
    .setProperty('--billy-color-gradient', '#dddddd');
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
        background-color: var(--billy-color-dark);
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
        border: 4px solid var(--billy-color-dark);
        border-radius: 100px;
      }

      .contrastToggle__fill {
        display: flex;
        align-items: center;
        transition: 0.25s;
        width: 20px;
        border-radius: 40px;
        height: 100%;
        background-color: white;
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
        @click="${this.toggleSwitch}"
      >
        <div class="contrastToggle__fill">
          <div class="contrastToggle__slider">
            <img
              class="contrastToggle__sliderIcon"
              src="/assets/icon/contrast-icon.svg"
            />
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
