import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../js/custom-element";

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
        display: flex;
        justify-content: center;
        align-items: center;
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
        width: 40px;
        user-select: none;
      }

      .contrastToggle__mobile {
        display: none;
      }

      @media(max-width: 850px), (pointer: coarse) {
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 50px;
        }

        .contrastToggle {
          background-color: transparent;
          box-shadow: none;
          width: 40px;
        }
        
        .contrastToggle__fill {
          display: none;
        }

        .contrastToggle__mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          box-shadow: none;
          cursor: pointer;
          border-radius: 50px;
          transition: 0.3s;
          margin-right: 20px;
        }

        .contrastToggle__mobileIcon {
          height: 40px;
          width: 40px;
          box-shadow: none;
        }

        .contrastToggle--on .contrastToggle__mobile {
          transform: rotate(180deg);
        }
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
        <div class="contrastToggle__mobile">
          <img alt="" class="contrastToggle__mobileIcon" src="/dist/assets/icon/contrast-icon.svg"/>
        </div>
      </div>
    `;
  }

  toggleSwitch() {
    this.on = !this.on;
  }
}

defineElement("billy-contrast-toggle", ContrastToggle)
