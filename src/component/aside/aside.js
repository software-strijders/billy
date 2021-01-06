import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { store } from "../../js/state/store";

class Aside extends LitElement {
  constructor() {
    super();

    store.subscribe(() => this.requestUpdate());
  }
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
        border: var(--billy-border);
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
        background-color: var(--billy-color-line-light);
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
    const state = store.getState();

    return html`
      <div class="aside__content">
        <!-- TODO: This could be a component -->
        ${
          state.related.links.length === 0
            ? html``
            : html`
            <div class="aside__card">
              <h2 class="aside__title">Gerelateerd</h1>
              <hr class="aside__line" />
              <div class="aside__links">
                ${state.related.links.map((link) => {
                  return html`
                    <div class="link">
                      <span class="link__title">${link.text}</span>
                      <a href="${link.href}" class="link__test">${link.href}</a>
                    </div>
                  `;
                })}
              </div>
            </div>
          `
        }
        <!-- TODO: This could be a component -->
        <div class="aside__card">
          <h2 class="aside__title">Auteur</h1>
          <hr class="aside__line" />
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">${
              state.related.author.fullName
            }</p>
            <div class="aside__logoWrapper">
              <img src="/assets/image/hogeschool-utrecht.png" alt="" class="aside__logo">
              <p class="aside__text">Hogeschool Utrecht</p>
            </div>
          </div>
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">Laatst bewerkt</p>
            <p class="aside__text">${state.related.lastRevised}</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("billy-aside", Aside);
