import { LitElement, html, css } from "lit-element";
import { Router } from "@vaadin/router";

import { store } from "../../js/state/store.js";
import { actions } from "../../js/state/login";
import { getArticles } from "../../js/api/api.js";
import { defineElement } from "../../js/custom-element";
import { deleteArticle } from "../../js/api/api.js";

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

      .profile__title--small {
        font-size: 30px;
        display: flex;
        align-items: center;
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

      .userInfo {
        display: flex;
        flex-direction: column;
        justify-content: start;
      }

      .userInfo__row {
        display: flex;
      }

      .userInfo__details {
        flex-grow: 1;
        text-align: left;
      }

      .userInfo__variables {
        width: 200px;
        color: var(--billy-color-text-primary-dark);
        font-size: 25px;
      }

      .userInfo__details {
        font-size: 25px;
        background: var(--billy-gradient-background-brand);
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--billy-color-transparent);
      }

      .profile__preferencesTitle {
        font-size: 40px;
        color: var(--billy-color-results-title);
        text-shadow: none;
        margin: 30px 0 0 0;
      }

      .profile__createArticleWrapper {
        display: flex;
        background: var(--billy-color-background-light-grey);
        justify-content: space-between;
        margin: 30px 0 0 0;
        padding: 20px;
        border-radius: 6px;
      }

      .preview__wrapper {
        display: flex;
        justify-content: space-between;
        height: 210px;
      }

      .profile__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .button__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 45px 10px;
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

      .button--delete {
        background: var(--billy-gradient-background-warning);
      }

      @media (max-width: 850px) {
        :host {
          padding: 0;
          width: 100%;
        }

        .profile__title {
          font-size: 30px;
          width: 100%;
        }

        .profile__preferencesTitle {
          font-size: 25px;
        }

        .profile {
          padding: 0;
          width: 100%;
        }

        .userInfo {
          margin: 0 0 0 10px;
        }

        .userInfo__row {
          flex-direction: column;
          margin: 5px 0;
        }

        .userInfo__variables,
        .userInfo__details {
          font-size: 15px;
        }

        .profile__line,
        .userInfo,
        .profile__preferencesTitle,
        .profile__createArticleWrapper {
          padding-left: 0;
          padding-right: 0;
          width: 100%;
        }

        .profile__createArticleWrapper {
          display: flex;
          align-items: center;
          height: 50px;
          padding: 5px;
        }

        .profile__title--small {
          margin-left: 5px;
          font-size: 20px;
        }

        .button {
          width: 200px;
          font-size: 15px;
        }

        .preview__wrapper {
          flex-direction: column;
          height: auto;
        }

        .button__wrapper {
          flex-direction: row;
          padding: 0;
        }

        .button__wrapper > .button {
          width: 45%;
        }
      }
    `;
  }

  render() {
    const state = store.getState();

    return html`
      <div class="profile">
        <div class="profile__top">
          <h1 class="profile__title">Profiel</h1>
          <button class="button button--delete" type="button" @click="${this._logOut}">
            Uitloggen
          </button>
        </div>
        <hr class="profile__line" />
        <div class="userInfo">
          <div class="userInfo__row">
            <span class="userInfo__variables">Voornaam:</span>
            <span class="userInfo__details">${state.login.user.firstName}</span>
          </div>
          <div class="userInfo__row">
            <span class="userInfo__variables">Achternaam:</span>
            <span class="userInfo__details">${state.login.user.lastName}</span>
          </div>
          <div class="userInfo__row">
            <span class="userInfo__variables">E-mail:</span>
            <span class="userInfo__details">${state.login.user.email}</span>
          </div>
          <div class="userInfo__row">
            <span class="userInfo__variables">Organisatie:</span>
            <span class="userInfo__details">${state.login.user.organization}</span>
          </div>
          <div class="userInfo__row">
            <span class="userInfo__variables">Functie:</span>
            <span class="userInfo__details">${state.login.user.role}</span>
          </div>
        </div>
        <h2 class="profile__preferencesTitle">Mijn Artikelen</h2>
        <hr class="profile__line" />
        <div class="profile__createArticleWrapper">
          <h3 class="profile__title profile__title--small">Nieuw Artikel</h3>
          <button class="button" type="button" @click="${this._redirectToCreateArticlePage}">
            Maak aan
          </button>
        </div>
        ${this.previews.map((article) => {
          return html`
            <div class="preview__wrapper">
              <billy-result-item
                href="/article${article.link}"
                title="${article.title}"
                description="${article.description}"
                readTime="${article.readTime}"
                date="${article.edits.length > 0 ? article.edits[article.edits.length - 1].date : article.date}"
                headCategory="${article.headCategory}"
                subCategory="${article.subCategory}"
              ></billy-result-item>
              <div class="button__wrapper">
                <button class="button" type="button" @click="${() => this._redirectToEditArticlePage(article.link)}">Pas aan</button>
                <button class="button button--delete" type="button">Verwijder</button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _redirectToCreateArticlePage() {
    Router.go("/create");
  }

  _redirectToEditArticlePage(link) {
    Router.go({ pathname: "/create", search: link});
  }

  _logOut() {
    window.localStorage.removeItem("data");
    store.dispatch(actions.login({ loggedIn: false, user: {} }));
    Router.go("/");
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
      return article.author.fullName === this.getNameOfUser();
    });
  }

  getNameOfUser() {
    if (store.getState().login.user.firstName !== "") {
      return store.getState().login.user.firstName + " " + store.getState().login.user.lastName;
    }
  }

  _deleteArticle(title) {
    deleteArticle(title).then(() => {
      alert("Artikel succesvol verwijderd");
      Router.go("/profile");
    });
  }
}

defineElement("billy-profile", Profile);
