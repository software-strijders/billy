import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../custom-element";
import { store } from "../../state/store";

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
        color: var(--billy-color-text-primary-dark);
      }

      .aside__textWrapper {
        margin: 0 0 10px 0;
      }

      .aside__text {
        margin: 0 0 5px 0;
        color: var(--billy-color-text-primary-dark);
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

      .link__href {
        word-break: break-all;
        color: var(--billy-color-text-link)
      }

      .link__title {
        word-break: break-word;
        font-size: 19px;
        color: var(--billy-color-text-primary-dark);
      }
    `;
  }

  render() {
    const state = store.getState();
    
    return html`
      <div class="aside__content">
        ${state.related.links.length === 0
          ? html``
          : html`
            <div class="aside__card">
              <h2 class="aside__title">Gerelateerd</h1>
              <billy-hr></billy-hr>
              <div class="aside__links">
                ${state.related.links.map((link) => {
                  return html`
                    <div class="link">
                      <span class="link__title">${link.text}</span>
                      <a href="${link.href}" class="link__href">${link.href}</a>
                    </div>
                  `;
                })}
              </div>
            </div>
          `}
        <div class="aside__card">
          <h2 class="aside__title">Auteur</h2>
          <billy-hr></billy-hr>
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">${state.related.author.fullName}</p>
            <div class="aside__logoWrapper">
              <img src="/dist/assets/image/${state.related.author.link}.png" alt="" class="aside__logo" />
              <p class="aside__text">${state.related.author.organization}</p>
            </div>
          </div>
          <div class="aside__textWrapper">
            <p class="aside__text aside__text--bold">Aangemaakt op</p>
            <p class="aside__text">${state.related.date}</p>
          </div>
        </div>
        ${state.related.edits.length > 0
          ? html` <div class="aside__card">
              <h2 class="aside__title">Laatste bewerking</h2>
              <billy-hr></billy-hr>
              <div class="aside__textWrapper">
                <p class="aside__text aside__text--bold">
                  ${state.related.edits[state.related.edits.length - 1].author.fullName}
                </p>
                <div class="aside__logoWrapper">
                  <img
                    src="/dist/assets/image/${state.related.edits[state.related.edits.length - 1].author.link}.png"
                    alt=""
                    class="aside__logo"
                  />
                  <p class="aside__text">${state.related.edits[state.related.edits.length - 1].author.organization}</p>
                </div>
              </div>
              <div class="aside__textWrapper">
                <p class="aside__text aside__text--bold">Datum</p>
                <p class="aside__text">${state.related.edits[state.related.edits.length - 1].date}</p>
              </div>
            </div>`
          : html``}
      </div>
    `;
  }
}

defineElement("billy-aside", Aside);
