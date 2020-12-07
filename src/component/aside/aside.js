import { LitElement, html, css } from "lit-element";

class Aside extends LitElement {
  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .aside__content {
        padding: 25px;
      }

      .aside__card {
        box-shadow: var(--billy-box-shadow-lighter);
        padding: 15px;
        margin: 0 0 25px 0;
        border-radius: 10px;
      }

      .aside__card:first-child {
        margin: var(--billy-aside-card-margin-offset) 0 25px 0;
      }

      .aside__title {
        margin: 0;
      }

      .aside__line {
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-grey);
        margin: 5px 0 20px 0;
      }

      .aside__textWrapper {
        margin: 0 0 10px 0;
      }

      .aside__text {
        margin: 0 0 5px 0;
      }

      .aside__text--bold {
        font-size: 19px;
        font-weight: bold;
      }

      .aside__logoWrapper {
        display: flex;
      }

      .aside__logo {
        height: 20px;
        width: auto;
        margin: 0 5px 0 0;
      }

      .link {
        display: flex;
        flex-direction: column;
        margin: 0 0 15px 0;
      }

      .link__title {
        font-size: 19px;
      }
    `;
  }

  render() {
    return html`
      <div class="aside__content">
        <div class="aside__card">
          <h2 class="aside__title">Gerelateerd</h1>
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
          <h2 class="aside__title">Auteur</h1>
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
