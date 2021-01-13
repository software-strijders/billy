import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Router } from "@vaadin/router";

import { sendArticle } from "../../js/api/api";
import { author } from "../../js/state/login";
import { store } from "../../js/state/store.js";
import { defineElement } from "../../js/custom-element";

const MAX_DESCRIPTION_LENGTH = 300;
const WORDS_PER_MINUTE = 250;

class EditingPage extends LitElement {
  constructor() {
    super();

    this._checkAccess();

    this._title = "";
    this._mainCategory = "Analyse";
    this._subCategory = "Gebruikersinteractie";
    this._htmlData = "";
    this.links = [{ text: "", href: "", save: false }];
  }

  _checkAccess() {
    if (!store.getState().login.loggedIn) {
      alert("Je hebt geen toegang tot deze pagina, u wordt omgeleid");
      window.location.href = "/";
    }

    if (window.innerWidth < 850) {
      alert("Gebruik alsjeblieft de desktop versie om artikelen te kunnen bewerken.")
      window.location.href = "/";
    }
  }

  static get properties() {
    return {
      links:       { type: Array   },
      showPreview: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: block;
        width: var(--billy-edit-page-width);
        padding: var(--billy-edit-page-padding);
      }

      .form {
        padding: var(--billy-edit-page-form-padding);
        max-width: 950px;
      }

      .form--disabled .form__input, .form--disabled .form__link .form__input {
        pointer-events: none;
        background-color: var(--billy-color-background-disabled);
        color: var(--billy-color-text-primary-light);
      }

      .form--disabled .form__select {
        pointer-events: none;
        background-color: var(--billy-color-background-disabled);
        color: var(--billy-color-text-hint);
      }

      .form--disabled .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__title {
        margin: 0;
        font-size: var(--billy-title-size);
        color: var(--billy-color-text-primary-dark);
      }

      .form__title--h2 {
        margin: 0 0 10px 0;
        font-size: 22px;
      }

      .form__line {
        height: var(--billy-line-height);
        border: none;
        background-color: var(--billy-color-line-light);
        border-radius: var(--billy-line-radius);
        margin: var(--billy-line-margin);
      }

      .form__wrapper {
        display: flex;
        flex-direction: column;
        padding: var(--billy-edit-page-form-wrapper-padding);
      }

      .form__wrapper--first {
        padding: var(--billy-edit-page-form-wrapper-padding-first);
      }

      .form__wrapper--select {
        flex-direction: row;
      }

      .form__wrapper--select .form__wrapper {
        padding: 0;
      }

      .form__wrapper--select .form__wrapper:last-child {
        margin: 0 0 0 25px;
      }

      .form__wrapper--button {
        justify-content: flex-end;
        flex-direction: row;
      }

      .form__wrapper--button .form__button--remove {
        margin: 0 20px 0 0;
        text-decoration: none;
        font-weight: bold;
      }

      .form__wrapper--links {
        flex-direction: column;
      }

      .form__wrapper--links .form__label {
        align-items: center;
        flex-direction: row;
        font-size: 18px;
        margin: 0 25px 0 0;
      }

      .form__wrapper--links .form__input {
        background-color: var(--billy-color-background-light);
        color: var(--billy-color-text-primary-dark);
        flex-grow: 1;
        margin: 0 25px 0 0;
      }

      .form__wrapper--links .form__button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
      }

      .form__wrapper--links .form__button:not(:last-child) {
        margin: 0 25px 0 0;
      }

      .form__label {
        display: flex;
        color: var(--billy-color-text-primary-dark);
        margin: var(--billy-edit-page-form-label-title-margin);
        font-size: var(--billy-edit-page-form-label-font-size);
        font-weight: bold;
      }

      .form__input {
        color: var(--billy-color-text-primary-dark);
        background-color: var(--billy-color-background-light);
        height: calc(var(--billy-edit-page-form-input-height) - var(--billy-border-size));
        border: var(--billy-border-size) solid var(--billy-color-line-light);
        border-radius: var(--billy-edit-page-radius);
        padding: var(--billy-edit-page-form-input-padding);
        font-size: var(--billy-edit-page-form-input-font-size);
        transition: background 0.3s;
      }

      .form__select {
        position: relative;
        color: var(--billy-color-text-primary-dark);
        height: var(--billy-edit-page-form-select-height);
        width: var(--billy-edit-page-form-select-width);
        border: var(--billy-border-size) solid var(--billy-color-line-light);
        padding: var(--billy-edit-page-form-select-padding);
        border-radius: var(--billy-edit-page-radius);
        overflow: hidden;
        appearance: none;
        background-color: var(--billy-color-background-light);
        background-image: var(--billy-edit-page-form-select-background-image-url);
        background-position: var(--billy-edit-page-form-select-background-position);
        background-repeat: no-repeat;
        cursor: pointer;
        transition: background 0.05s;
      }

      .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__select--wrapper {
        border: var(--billy-edit-page-select-border);
      }

      .form__link {
        animation: "slideIn";
        transition: 0.3s;
        display: flex;
        justify-content: center;
        height: 45px;
        margin: 0 0 20px 0;
      }

      .form__link:last-child {
        margin: 0;
      }

      .form__link .form__labelTitle {
        margin: 0 25px 0 0;
        font-size: 18px;
      }

      .form__button {
        padding: var(--billy-edit-page-form-button-padding);
        border-radius: var(--billy-edit-page-radius);
        background: var(--billy-color-button-gradient);

        border: var(--billy-border-link-button);
        color: var(--billy-color-text-primary-light);
        font-size: var(--billy-edit-page-form-button-font-size);
        cursor: pointer;
        transition: background-size 0.3s, 0.3s;
        font-weight: bold;
      }

      .form__button:hover {
        background-size: var(--billy-edit-page-form-button-background-size-hover);
      }

      .form__button--remove {
        background-image: var(--billy-gradient-background-warning);
      }

      .form__buttonImg {
        height: 50%;
        width: auto;
        pointer-events: none;
      }
    `;
  }

  render() {
    return html`
      <form class="form ${classMap({ "form--disabled": this.showPreview })}">
        <h1 class="form__title">Artikel aanmaken</h1>
        <hr class="form__line" />
        <div class="form__wrapper form__wrapper--first">
          <label class="form__label" for="title">Titel</label>
          <input id="title" name="title" class="form__input" type="text" required />
        </div>
        <div class="form__wrapper form__wrapper--select">
          <div class="form__wrapper">
            <label class="form__label" for="mainCategory">Hoofdcategorie</label>
            <select id="mainCategory" name="headCategory" class="form__select" required>
              <option disabled selected>Selecteer item</option>
              <option>Analyse</option>
              <option>Advies</option>
              <option>Ontwerp</option>
              <option>Realisatie</option>
              <option>Beheer</option>
            </select>
          </div>
          <div class="form__wrapper">
            <label class="form__label" for="subCategory">Subcategorie</label>
            <select id="subCategory" name="subCategory" class="form__select" required>
              <option disabled selected>Selecteer item</option>
              <option>Gebruikersinteractie</option>
              <option>Organisatie Processen</option>
              <option>Infrastructuur</option>
              <option>Software</option>
              <option>Hardware Interfacing</option>
            </select>
          </div>
        </div>
        <div class="form__wrapper form__wrapper--links">
          <h2 class="form__title form__title--h2">Links (optioneel)</h2>
          ${this.links.map((link, index) => {
            return html`
            <div class="form__link" data-index="${index}">
              <label class="form__label" for="link-text-${index}">Tekst</label>
              <input id="link-text-${index}" class="form__input" type="text" value="${
              link.text
            }" ?required="${link.save}">
              <label class="form__label" for="link-href-${index}">Link</label>
              <input id="link-href-${index}" class="form__input" type="url" value="${link.href}">
              ${
                link.save
                  ? html`
                      <button
                        class="form__button form__button--remove"
                        type="button"
                        @click="${this._removeLinkClick}"
                      >
                        <img
                          class="form__buttonImg"
                          aria-label="Verwijder link van artikel"
                          src="/distassets/icon/minus-icon.svg"
                          alt=""
                        />
                      </button>
                    `
                  : html`
                      <button class="form__button" type="button" @click="${this._addLinkClick}">
                        <img
                          class="form__buttonImg"
                          aria-label="Voeg link toe aan artikel"
                          src="/dist/assets/icon/plus-icon.svg"
                          alt=""
                        />
                      </button>
                    `
              }
              </button>
            </div>
            `;
          })}
        </div>
        <div class="form__wrapper">
          <billy-editor
            @on-edit="${this._handleChange}"
            @on-preview="${this._handlePreview}"
            title="${this._title}"
            mainCategory="${this._mainCategory}"
            subCategory="${this._subCategory}"
          ></billy-editor>
        </div>
        <div class="form__wrapper form__wrapper--button">
          <a href="/" class="form__button form__button--remove">Annuleren</a>
          <button @click="${this._handleSaveClick}" class="form__button" type="button">
            Publiceer artikel
          </button>
        </div>
      </form>
    `;
  }

  updated() {
    const index = this.links.length - 1;
    const links = this.shadowRoot.querySelectorAll(".form__link");

    // Manually clear the values of the input fields.
    // This is probably because LitElement caches elements inside of it, thus we have to resort to this:
    const lastLink = [...links].pop();
    lastLink.querySelector(`#link-text-${index}`).value = "";
    lastLink.querySelector(`#link-href-${index}`).value = "";
  }

  _handleChange(event) {
    this._htmlData = event.detail.html;

    if (this.showPreview) this.requestUpdate();
  }

  _handlePreview(event) {
    this.showPreview = event.detail;

    this._title = this.shadowRoot.querySelector("#title").value;
    this._mainCategory = this.shadowRoot.querySelector("#mainCategory option:checked").text;
    this._subCategory = this.shadowRoot.querySelector("#subCategory option:checked").text;
  }

  _addLinkClick(e) {
    const parent = e.target.parentNode;
    const index = this.links.length - 1;

    const previousLink = this.links.pop();
    previousLink.text = parent.querySelector(`#link-text-${index}`).value;
    previousLink.href = parent.querySelector(`#link-href-${index}`).value;
    previousLink.save = true;

    this.links = [...this.links, previousLink, { text: "", href: "", save: false }];
  }

  _removeLinkClick(e) {
    const index = parseInt(e.target.parentNode.dataset.index);
    this.links = [...this.links.filter((item, _index) => _index !== index)];
  }

  _handleSaveClick() {
    const form = this.shadowRoot.querySelector("form");
    if (!form.reportValidity()) {
      return;
    }
    if (this._htmlData === "") {
      alert("Voer de artikel tekst in.");
      return;
    }

    const formData = new FormData(form);
    let article = {};
    formData.forEach((value, key) => {
      article[key] = value;
    });

    const strippedHtml = this._getStrippedHtml(this._htmlData);

    article["author"] = author(store.getState());
    article["text"] = this._htmlData;
    article["description"] = this._getDescription(strippedHtml);
    article["readTime"] = this._calculateReadTime(strippedHtml);
    article["lastRevised"] = this._getDate();
    article["link"] = `?a=${article.title}`;
    article["links"] = this._getLinks() || [];

    sendArticle(article).then(() => {
      alert("Artikel succesvol aangemaakt");
      Router.go({ pathname: "/article", search: `?a=${article.title}`});
    });
  }

  _getStrippedHtml(html) {
    return html
      // Strip html tags
      .replace(/<[^>]+>/g, '')
      // Seperate titles sticking to paragraph text
      .replace(/([a-z0-9])([A-Z])/g, "$1. $2")
  }

  _getDescription(text) {
    if (text.length < MAX_DESCRIPTION_LENGTH) return text;

    return `${text.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
  }

  _calculateReadTime(text) {
    return Math.ceil(text.split(" ").length / WORDS_PER_MINUTE);
  }

  _getDate() {
    return new Date().toISOString().split("T")[0];
  }

  _getLinks() {
    return this.links
      .filter(link => link.save)
      .map(link => ({ text: link.text, href: link.href }));
  }
}

defineElement("billy-editing-page", EditingPage);
