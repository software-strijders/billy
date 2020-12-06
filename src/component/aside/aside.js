import { LitElement, html, css } from "lit-element";

class Aside extends LitElement {
  static getStyles() {
    return css`
      @import "../component/aside/aside.css";
    `;
  }

  render() {
    return html`
      <div class="aside__content">
        <div class="aside__card">
          <h1 class="aside__title">Gerelateerd</h1>
          <hr class="aside__line" />
          <div class="aside__links">
            <div class="link">
              <span class="link__title">Wat is een user story?</span>
              <a
                href="https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F"
                class="link__text"
              >
                https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F
              </a>
            </div>
            <div class="link">
              <span class="link__title">Wat is een user story?</span>
              <a
                href="https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F"
                class="link__text"
              >
                https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F
              </a>
            </div>
            <div class="link">
              <span class="link__title">Wat is een user story?</span>
              <a
                href="https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F"
                class="link__text"
              >
                https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F
              </a>
            </div>
            <div class="link">
              <span class="link__title">Wat is een user story?</span>
              <a
                href="https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F"
                class="link__text"
              >
                https://duckduckgo.com/?t=ffab&q=wat+is+een+user+story%3F
              </a>
            </div>
          </div>
        </div>
        <div class="aside__card">
          <h1 class="aside__title">Auteur</h1>
          <hr class="aside__line" />
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">Jort Willemsen</p>
            <div class="aside__logoWrapper">
              <img src="/assets/image/hu-logo-small.png" alt="" class="aside__logo">
              <p class="aside__text">Hogeschool Utrecht</p>
            </div>
          </div>
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">Laatst bewerkt</p>
            <p class="aside__text">20-11-2020 - 15:00</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("billy-aside", Aside);
