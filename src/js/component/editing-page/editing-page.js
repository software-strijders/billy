import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Router } from "@vaadin/router";

import { getArticleByTitle, sendArticle, updateArticle } from "../../api/api";
import { author } from "../../state/login";
import { actions as editActions } from "../../state/edit-mode";
import { store } from "../../state/store";
import { defineElement } from "../../custom-element";

const MAX_DESCRIPTION_LENGTH = 300;
const WORDS_PER_MINUTE = 250;

class EditingPage extends LitElement {
  constructor() {
    super();

    this._checkAccess();

    this._htmlData = "";
    this._injectedLinks = false;
    this._mainCategory = "Analyse";
    this._subCategory = "Gebruikersinteractie";
    this._title = "";

    this.links = [{ text: "", href: "", save: false }];
    this.edits = [];

    this._getArticleToEdit();
  }

  _checkAccess() {
    if (!store.getState().login.loggedIn) {
      alert("U heeft geen toegang tot deze pagina, u wordt omgeleid");
      window.location.href = "/";
    }
  }

  static get properties() {
    return {
      links: { type: Array },
      showPreview: { type: Boolean },
      editMode: { type: Boolean },
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

      .form--disabled .form__input,
      .form--disabled .form__link .form__input {
        pointer-events: none;
        background-color: var(--billy-color-background-disabled);
        color: var(--billy-color-text-hint);
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
        background-size: var(--billy-edit-page-form-select-background-size);
        cursor: pointer;
        transition: background 0.05s;
      }

      .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__select--wrapper {
        border: var(--billy-border);
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
        border: var(--billy-border);
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

      @media (max-width: 850px), (pointer: coarse) {
        :host {
          padding: 0;
        }

        .form__title {
          font-size: 32px;
        }

        .form__wrapper--select {
          flex-direction: column;
        }

        .form__wrapper--select .form__wrapper:last-child {
          margin: 10px 0 0 0;
        }

        .form__link {
          flex-direction: column;
          height: auto;
        }

        .form__title--h2 {
          font-size: var(--billy-edit-page-form-label-font-size);
        }

        .form__link .form__label {
          margin: 0;
        }

        .form__link .form__input {
          margin: 0 0 15px 0;
        }
      }
    `;
  }

  render() {
    return html`
      <form class="form ${classMap({ "form--disabled": this.showPreview })}">
        <h1 class="form__title">${this.editMode ? "Artikel aanpassen" : "Artikel aanmaken"}</h1>
        <billy-hr></billy-hr>
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
              <input id="link-text-${index}" class="form__input" type="text" value="${link.text}" ?required="${
              link.save
            }">
              <label class="form__label" for="link-href-${index}">Link</label>
              <input id="link-href-${index}" class="form__input" type="url" value="${link.href}">
              ${
                link.save
                  ? html`
                      <button class="form__button form__button--remove" type="button" @click="${this._removeLinkClick}">
                        <img
                          class="form__buttonImg"
                          aria-label="Verwijder link van artikel"
                          src="/dist/assets/icon/minus-icon.svg"
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
          <a href="${this._getCancelButtonHref()}" class="form__button form__button--remove">Annuleren</a>
          <button
            @click="${this.editMode ? this._handleEditClick : this._handleSaveClick}"
            class="form__button"
            type="button"
          >
            ${this.editMode ? "Pas aan" : "Publiceer artikel"}
          </button>
        </div>
      </form>
    `;
  }

  updated() {
    const index = this.links.length - 1;
    const links = this.shadowRoot.querySelectorAll(".form__link");

    // If the links are injected (editing-mode) we need to take care of a few things
    if (this._injectedLinks) {
      this.links =
        this.links[0].save && this.links.length > 0
          ? [...this.links, { href: "", text: "", save: false }]
          : [...this.links];

      links[0].querySelector("#link-text-0").value = this.links[0].text;
      links[0].querySelector("#link-href-0").value = this.links[0].href;

      this._injectedLinks = false;
      return;
    }

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
    try {
      let article = this._formArticleData();
      sendArticle(article).then(() => {
        alert("Artikel succesvol aangemaakt");
        Router.go({ pathname: "/article", search: `?a=${article.title}` });
      });
    } catch (e) {
      alert(e.message);
    }
  }

  _handleEditClick() {
    try {
      let article = this._formArticleData();
      updateArticle(article, store.getState().editMode.articleTitle).then(() => {
        alert("Artikel succesvol aangepast");
        Router.go({ pathname: "/article", search: `?a=${article.title}` });
      });
    } catch (e) {
      alert(e.message);
    }
  }

  _formArticleData() {
    const form = this.shadowRoot.querySelector("form");
    if (!form.reportValidity()) {
      throw Error("1 of meer velden niet ingevuld");
    }

    if (this._htmlData === "") {
      throw Error("Voer de artikel tekst in.");
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
    article["date"] = this._getDate();
    article["link"] = `?a=${article.title}`;
    article["links"] = this._getLinks() || [];

    if (this.editMode) {
      this.edits.push({ date: this._getDate(), author: author(store.getState()) });
    }
    article["edits"] = this.edits;

    return article;
  }

  _getCancelButtonHref() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("a")) {
      return `/article?a=${urlParams.get("a")}`;
    }
    return `/profile`;
  }

  _getStrippedHtml(html) {
    return (
      html
        // Strip html tags
        .replace(/<[^>]+>/g, "")
        // Seperate titles sticking to paragraph text
        .replace(/([a-z0-9])([A-Z])/g, "$1. $2")
    );
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
    return this.links.filter((link) => link.save).map((link) => ({ text: link.text, href: link.href }));
  }

  _getArticleToEdit() {
    let urlParams = new URLSearchParams(window.location.search);
    let articleTitle = "";

    if (urlParams.has("a")) {
      articleTitle = urlParams.get("a");
      getArticleByTitle(articleTitle).then((article) => {
        this.shadowRoot.querySelector("#title").value = article.title;
        this.shadowRoot.querySelector("#mainCategory").value = article.headCategory;
        this.shadowRoot.querySelector("#subCategory").value = article.subCategory;
        this.links =
          article.links.length > 0
            ? // Only map the links when there are actually links
              article.links.map((link) => ({ text: link.text, href: link.href, save: true }))
            : // Otherwise just use the default structure
              [...this.links];
        this.editMode = true;
        this._injectedLinks = true;
        this._htmlData = article.text;
        this.edits = article.edits;

        store.dispatch(
          editActions.articleToEdit({
            inEditMode: true,
            articleTitle: articleTitle,
            articleContent: article.text,
          }),
        );
      });
    }
  }
}

defineElement("billy-editing-page", EditingPage);
