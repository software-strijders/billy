import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";

class CategoryOption extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      icon: { type: String },
      text: { type: String },
      sideBar: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
      }

      .category {
        text-decoration: none;
        color: var(--billy-color-font-dark);
      }

      .category--sideBar {
        font-size: 13px;
        margin: 20px;
      }

      .category--sideBar .category__image {
        height: 60px;
        width: 60px;
      }

      .category__image {
        height: 80px;
        width: 80px;
      }

      .category__text {
        text-align: center;
        font-weight: bold;
      }

      .popOut {
        position: absolute;
        bottom: 240px;
        width: 200px;
        padding: 20px;
        background-color: var(--billy-color-white);
        border-radius: 10px;
        box-shadow: var(--billy-box-shadow);
        transition: 0.25s;
        opacity: 0;
        transform: scale(1.025);
        visibility: hidden;
      }

      :host(:hover) .popOut {
        visibility: visible;
        transform: translateY(30px) scale(1);
        opacity: 1;
      }

      .popOut--sideBar {
        bottom: 280px;
        margin: 0 0 -385px 385px;
      }

      .popOut--sideBar .popOut__pointerContainer {
        transform: rotate(90deg);
        top: 30px;
        left: -130px;
        height: 20px;
      }

      .popOut__option {
        margin: 0 0 15px 0;
      }

      .popOut__link {
        text-decoration: none;
        color: var(--billy-color-font-dark);
        font-weight: bold;
      }

      .popOut__line {
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-light-grey);
      }

      .popOut__pointerContainer {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 0 0 -19px 0;
      }

      .popOut__pointer {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid var(--billy-color-light-grey);
      }
    `;
  }

  render() {
    return html`
      <div class="popOut ${classMap({ "popOut--sideBar": this.sideBar })}">
        <div class="popOut__option">
          <a href="#" class="popOut__link">Gebruikersinteractie</a>
          <hr class="popOut__line">
        </div>
        <div class="popOut__option">
          <a href="#" class="popOut__link">Organisatie processen</a>
          <hr class="popOut__line">
        </div>
        <div class="popOut__option">
          <a href="#" class="popOut__link">Infrastructuur</a>
          <hr class="popOut__line">
        </div>
        <div class="popOut__option">
          <a href="#" class="popOut__link">Software</a>
          <hr class="popOut__line">
        </div>
        <div class="popOut__option">
          <a href="#" class="popOut__link">Hardware interfacing</a>
          <hr class="popOut__line">
        </div>
        <div class="popOut__pointerContainer">
          <div class="popOut__pointer"></div>
        </div>
      </div>
      <a class="category ${classMap({
        "category--sideBar": this.sideBar,
      })}" ClassMap href="${this.href}">
        <div>
          <img alt="" class="category__image" src="${this.icon}"></img>
          <p class="category__text">${this.text}</p>
        </div>
      </a>
    `;
  }
}

customElements.define("billy-category-option", CategoryOption);
