import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Router } from "@vaadin/router";

import { sendArticle } from "../../js/api/api";
import { author } from "../../js/state/login";
import { store } from "../../js/state/store.js";
import { getArticles } from "../../js/api/api.js";
import { defineElement } from "../../js/custom-element";

class Profile extends LitElement {
  constructor() {
    super();

    this.isFinished = false;
    this.previews = [];
    this._checkAccess();
    this._getResultItems();

    window.locationchange = () => {
      this.isFinished = false;
      this._getResultItems();
    };
  }

  _checkAccess() {
    if (!store.getState().login.loggedIn) {
      alert("Je hebt geen toegang tot deze pagina, u wordt omgeleid");
      window.location.href = "/";
    }
  }

  static get properties() {
    return {
      isFinished: { type: Boolean },
    };
  }

  static getStyles() {
      return css`
      :host {
        display: block;
        width: var(--billy-edit-page-width);
        padding: var(--billy-edit-page-padding);
      }

      .profile {
        padding: 30px;
        text-align: left;
      }

      .profile__title {
        font-size: var(--billy-title-size);
        color: var(--billy-color-results-title);
        text-shadow: none;
        margin: 0;
      }

      .profile__name {
        background: var(--billy-gradient-background-brand);
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--billy-color-transparent);
      }

      .profile__line {
        margin: var(--billy-line-margin);
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-line-light);
      }

      .profile__preferencesTitle {
        font-size: 40px;
        color: var(--billy-color-results-title);
        text-shadow: none;
        margin: 0;
      }

      .create__button {
        padding: var(--billy-edit-page-form-button-padding);
        border-radius: var(--billy-edit-page-radius);
        background: var(--billy-color-button-gradient);
        border: var(--billy-border-link-button);
        color: var(--billy-color-text-primary-light);
        font-size: var(--billy-edit-page-form-button-font-size);
        cursor: pointer;
        transition: background-size 0.3s ease 0s, all 0.3s ease 0s;
        font-weight: bold;
      }

      .create__article-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-style: solid;
        border-color: var(--billy-color-line-light);
        border-radius: 6px;
        padding: 6px;
      }
      `;
  }

  disconnectedCallback() {
    // Removes the event listener.
    // If we don't, we create our own personal DDoS machine...
    window.locationchange = null;
  }

  render() {
      return html`
      <div class="profile">
        <h1 class="profile__title">
            Profiel - <span class="profile__name"> ${this.getNameOfUser()} </span>
        </h1>
        <hr class="profile__line"/>
        <br>
        <h2 class="profile__preferencesTitle">
            Voorkeuren
        </h2>
        <hr class="profile__line"/>
        <br>
        <div class="create__article-wrapper">
          <span class="profile__title"> Nieuw Artikel </span>
          <button class="create__button" type="button" @click="${this._redirectToCreateArticlePage}">Maak aan</button>
        </div>
        <br>
        <br>
        <h3 class="profile__preferencesTitle">
          Mijn artikelen
        </h3>
        <hr class="profile__line"/>
        <div id="resultItems" class="results__items">
          ${this.previews.map((article) => {
                return html`
                  <billy-result-item
                    href="/article${article.link}"
                    title="${article.title}"
                    description="${article.description}"
                    readTime="${article.readTime}"
                    lastRevised="${article.lastRevised}"
                    headCategory="${article.headCategory}"
                    subCategory="${article.subCategory}"
                  ></billy-result-item>
                `;
              })}
        </div>
      </div>
      `;
  }

  _redirectToCreateArticlePage() {
    window.location.href="/create";
  }

  _getResultItems() {
    getArticles().then((json) => {
      this.previews = json.articles;
      this._filterByUser();
    
      // Only render when filtering has finished.
      this.isFinished = true;
    });
  }

  _filterByUser() {
    this.previews = this.previews.filter((article) => {
      return (
        article.author.fullName === this.getNameOfUser()
        );
    });
  }
  

  getNameOfUser() {
    if (store.getState().login.user.firstName !== "") {
      return store.getState().login.user.firstName + " " + store.getState().login.user.lastName;
    }
  }
}

defineElement("billy-profile", Profile);