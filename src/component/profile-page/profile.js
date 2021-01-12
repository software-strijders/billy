import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Router } from "@vaadin/router";

import { sendArticle } from "../../js/api/api";
import { author } from "../../js/state/login";
import { store } from "../../js/state/store.js";
import { defineElement } from "../../js/custom-element";

class Profile extends LitElement {
  constructor() {
    super();

    this._checkAccess();
  }

  _checkAccess() {
    if (!store.getState().login.loggedIn) {
      alert("Je hebt geen toegang tot deze pagina, u wordt omgeleid");
      window.location.href = "/";
    }
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
      </div>
      `;
  }

  getNameOfUser() {
    if (store.getState().login.user.firstName !== "") {
      return store.getState().login.user.firstName + " " + store.getState().login.user.lastName;
    }
  }
}

defineElement("billy-profile", Profile);