import { LitElement, html, css } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { getArticleByTitle } from "../../js/api/api.js";
import { Router } from "@vaadin/router";

import { defineElement } from "../../js/custom-element.js";
import { actions } from "../../js/state/article-related.js";
import { store } from "../../js/state/store.js";

class Article extends LitElement {
  constructor() {
    super();

    this.isDone = false;
    this.isPreview = false;

    this._getArticle();
  }

  static get properties() {
    return {
      html: { type: String, reflect: true },
      title: { type: String, reflect: true },
      mainCategory: { type: String, reflect: true },
      subCategory: { type: String, reflect: true },
      isPreview: { type: Boolean, reflect: true },
      isDone: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        word-break: break-word;
      }

      .article__content {
        padding: 25px;
        color: var(--billy-color-text-primary-dark);
      }

      .article__title {
        font-size: var(--billy-title-size);
        margin: 0;
      }

      .article__categories {
        margin: 0 0 10px 0;
      }

      .category {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 10px 0 0;
        background-color: var(--billy-color-background-grey);
        border-radius: 20px;
        color: var(--billy-color-text-primary-dark);
        border: var(--billy-border);
      }

      .category__text {
        margin: 0;
        color: var(--billy-color-font-dark);
        font-size: 14px;
      }

      .article__line {
        height: var(--billy-line-height);
        margin: 15px 0 25px 0;
        background-color: var(--billy-color-line-light);
        border: none;
        border-radius: var(--billy-line-radius);
      }

      .article__heading {
        font-size: 22px;
      }

      .article__paragraph {
        font-size: 18px;
        margin: 0 0 25px 0;
      }

      .button {
        padding: var(--billy-edit-page-form-button-padding);
        border-radius: var(--billy-edit-page-radius);
        background: var(--billy-color-button-gradient);
        border: var(--billy-border);
        color: var(--billy-color-text-primary-light);
        font-size: var(--billy-edit-page-form-button-font-size);
        cursor: pointer;
        transition: background-size 0.3s ease 0s, all 0.3s ease 0s;
        font-weight: bold;
      }

      @media (max-width: 850px) {
        .article__content {
          padding: 0;
        }

        .article__title {
          font-size: 30px;
        }
      }

      .title__bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }

  render() {
    return html`
      ${this.isDone || this.isPreview
        ? html`
            <article class="article__content">
              <div class="article__categories">
                <!-- TODO: Make into billy-article-tag component -->
                <div class="category">
                  <p class="category__text">${this.mainCategory}</p>
                </div>
                <div class="category">
                  <p class="category__text">${this.subCategory}</p>
                </div>
              </div>
              <div class="title__bar">
                <h1 class="article__title">${this.title}</h1>
                ${store.getState().login.loggedIn
                  ? html`<button class="button" @click="${() => this._redirectToEditArticlePage("?a=" + this.title)}">
                      Pas aan
                    </button>`
                  : html``}
              </div>
              <hr class="article__line" />
              ${unsafeHTML(this.html)}
            </article>
            <style>
              @import "/dist/css/article.css";
            </style>
          `
        : html``}
    `;
  }

  _getArticle() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("a")) {
      getArticleByTitle(urlParams.get("a")).then((data) => {
        this.isDone = true;
        this.title = data.title;
        this.mainCategory = data.headCategory;
        this.subCategory = data.subCategory;
        this.html = data.text;

        store.dispatch(
          actions.setLinks({
            author: data.author,
            lastRevised: data.lastRevised,
            links: data.links,
            edits: data.edits,
          }),
        );
      });
    }
  }

  _redirectToEditArticlePage(link) {
    Router.go({ pathname: "/create", search: link });
  }
}

defineElement("billy-article", Article);
