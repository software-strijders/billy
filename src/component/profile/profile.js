import { LitElement, html, css } from "lit-element";

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

      .profile__userInfoWrapper {
        display: flex;
        justify-content: right;
      }

      .profile__userInfo {
        display: flex;
        flex-direction: column;
        margin: 30px;
      }

      .profile__userInfoVariables {
        font-size: 30px;
      }

      .profile__userInfoDetails {
        font-size: 30px;
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
      }

      .button__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px 0 50px 50px;
      }

      .button {
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

      .button--delete {
        background: var(--billy-gradient-background-warning);
      }
    `;
  }

  render() {
    const state = store.getState();

    return html`
      <div class="profile">
        <h1 class="profile__title">
          Profiel - <span class="profile__name"> ${this.getNameOfUser()} </span>
        </h1>
        <hr class="profile__line" />

        <div class="profile__userInfoWrapper">
          <div class="profile__userInfo">
            <span class="profile__userInfoVariables">Voornaam:</span>
            <span class="profile__userInfoVariables">Achternaam:</span>
            <span class="profile__userInfoVariables">E-mail:</span>
            <span class="profile__userInfoVariables">Organisatie:</span>
            <span class="profile__userInfoVariables">Functie:</span>
          </div>
          <div class="profile__userInfo">
            <span class="profile__userInfoDetails">${state.login.user.firstName}</span>
            <span class="profile__userInfoDetails">${state.login.user.lastName}</span>
            <span class="profile__userInfoDetails">${state.login.user.email}</span>
            <span class="profile__userInfoDetails">${state.login.user.organization}</span>
            <span class="profile__userInfoDetails">${state.login.user.role}</span>
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
                lastRevised="${article.lastRevised}"
                headCategory="${article.headCategory}"
                subCategory="${article.subCategory}"
              ></billy-result-item>
              <div class="button__wrapper">
                <button class="button" type="button">Pas aan</button>
                <button class="button button--delete" type="button">Verwijder</button>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _redirectToCreateArticlePage() {
    window.location.href = "/create";
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
}

defineElement("billy-profile", Profile);
