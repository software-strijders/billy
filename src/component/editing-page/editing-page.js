import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { sendArticle } from "../../js/api/api";
import { store } from "../../js/state/store.js";

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
    this.links = [{ text: "", href: "", save: false, }];
  }

  _checkAccess() {
    if (!store.getState().login.loggedIn) {
      alert("Je hebt geen toegang tot deze pagina, u wordt omgeleid");
      window.history.back();
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
      }

      .form--disabled .form__input {
        pointer-events: none;
        background-color: var(--billy-color-grey);
        color: var(--billy-color-font-light);
      }

      .form--disabled .form__select {
        pointer-events: none;
        background-color: var(--billy-color-grey);
        color: var(--billy-color-font-light);
      }

      .form--disabled .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__title {
        margin: 0;
        font-size: var(--billy-title-size);
      }

      .form__line {
        height: var(--billy-line-height);
        border: none;
        background-color: var(--billy-color-grey);
        border-radius: var(--billy-line-radius);
        margin: var(--billy-line-margin);
      }

      .form__wrapper {
        display: flex;
        padding: var(--billy-edit-page-form-wrapper-padding);
      }

      .form__wrapper--first {
        padding: var(--billy-edit-page-form-wrapper-padding-first);
      }

      .form__wrapper--select .form__wrapper {
        padding: 0;
      }

      .form__wrapper--select .form__wrapper:last-child {
        margin: 0 0 0 25px;
      }

      .form__wrapper--button {
        justify-content: flex-end;
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
      }

      .form__wrapper--links .form__input {
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
        flex-direction: column;
        width: 100%;
      }

      .form__labelTitle {
        margin: var(--billy-edit-page-form-label-title-margin);
        font-size: var(--billy-edit-page-form-label-font-size);
      }

      .form__input {
        height: calc(var(--billy-edit-page-form-input-height) - var(--billy-border-size));
        border: var(--billy-border-size) solid var(--billy-color-grey);
        border-radius: var(--billy-edit-page-radius);
        padding: var(--billy-edit-page-form-input-padding);
        font-size: var(--billy-edit-page-form-input-font-size);
        transition: background 0.3s;
      }

      .form__select {
        position: relative;
        height: var(--billy-edit-page-form-select-height);
        width: var(--billy-edit-page-form-select-width);
        border: var(--billy-border-size) solid var(--billy-color-grey);
        padding: var(--billy-edit-page-form-select-padding);
        border-radius: var(--billy-edit-page-radius);
        overflow: hidden;
        appearance: none;
        background-color: var(--billy-color-white);
        background-image: var(--billy-edit-page-form-select-background-image-url);
        background-position: var(--billy-edit-page-form-select-background-position);
        background-repeat: no-repeat;
        cursor: pointer;
        transition: background 0.05s;
      }

      .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__link {
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
        background: none;
        background-image: var(--billy-edit-page-form-button-background);
        background-size: var(--billy-edit-page-form-button-background-size);
        border: none;
        color: var(--billy-color-white);
        font-size: var(--billy-edit-page-form-button-font-size);
        cursor: pointer;
        transition: background-size 0.3s, 0.3s;
        font-weight: bold;
      }

      .form__button:hover {
        background-size: var(--billy-edit-page-form-button-background-size-hover);
      }

      .form__button--grey {
        background-image: none;
        background-color: var(--billy-color-lighter-grey);
        border: 2px solid var(--billy-color-grey);
        color: var(--billy-color-font-dark);
      }

      .form__button--grey:hover {
        background-color: var(--billy-color-grey);
      }

      .form__button--remove {
        background-image: var(--billy-remove-gradient);
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
        <hr class="form__line">
        <div class="form__wrapper form__wrapper--first">
          <label class="form__label" for="title">
            <h2 class="form__labelTitle">Titel</h1>
            <input id="title" name="title" class="form__input" type="text" required />
          </label>
        </div>
        <div class="form__wrapper form__wrapper--select">
          <div class="form__wrapper">
            <label class="form__label">
              <h2 class="form__labelTitle">Hoofdcategorie</h2>
              <select id="mainCategory" name="headCategory" class="form__select" required>
                <option disabled selected>Selecteer item</option>
                <option>Analyse</option>
                <option>Advies</option>
                <option>Ontwerp</option>
                <option>Realisatie</option>
                <option>Beheer</option>
              </select>
            </label>
          </div>
          <div class="form__wrapper">
            <label class="form__label">
              <h2 class="form__labelTitle">Subcategorie</h2>
              <select id="subCategory" name="subCategory" class="form__select" required>
                <option disabled selected>Selecteer item</option>
                <option>Gebruikersinteractie</option>
                <option>Organisatie Processen</option>
                <option>Infrastructuur</option>
                <option>Software</option>
                <option>Hardware Interfacing</option>
              </select>
            </label>
          </div>
        </div>
        <div class="form__wrapper form__wrapper--links">
          <h2 class="form__labelTitle">Links (optioneel)</h2>
          ${this.links.map((link, index) => {
            return html`
            <div class="form__link" data-index="${index}">
              <label class="form__label" for="link-text-${index}">
                <h3 class="form__labelTitle">Tekst</h2>
                <input id="link-text-${index}" class="form__input" type="text" value="${link.text}" ?required="${link.save}">
              </label>
              <label class="form__label" for="link-href-${index}">
                <h3 class="form__labelTitle">Link </h2>
                <input id="link-href-${index}" class="form__input" type="url" value="${link.href}">
              </label>
              ${link.save 
                ? html`
                    <button class="form__button form__button--remove" type="button" @click="${this._removeLinkClick}">
                      <img class="form__buttonImg" src="assets/icon/minus-icon.svg" alt="">
                    </button>
                  ` 
                : html`
                    <button class="form__button" type="button" @click="${this._addLinkClick}">
                      <img class="form__buttonImg" src="assets/icon/plus-icon.svg" alt="">
                    </button>
                  `
              }
              </button>
            </div>
            `
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
          <button @click="${this._handleSaveClick}" class="form__button" type="button">Publiceer artikel</button>
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

    this._title = this.shadowRoot.querySelector("#title").value
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

    this.links = [...this.links, previousLink, { text: "", href: "", save: false}];
  }

  _removeLinkClick(e) {
    const index = parseInt(e.target.parentNode.dataset.index);
    this.links = [...this.links.filter((item, _index) => _index !== index )];
  }

  _handleSaveClick() {
    const form = this.shadowRoot.querySelector("form");
    if (!form.reportValidity()) {
      return;
    } if (this._htmlData === "") {
      alert("Voer de artikel tekst in.");
      return;
    }

    const formData = new FormData(form);
    let article = {}
    formData.forEach((value, key) => {
      article[key] = value;
    });

    const strippedHtml = this._getStrippedHtml(this._htmlData);

    article["text"] = this._htmlData;
    article["description"] = this._getDescription(strippedHtml);
    article["readTime"] = this._calculateReadTime(strippedHtml);
    article["lastRevised"] = this._getDate();
    article["links"] = this.links
      .filter(link => link.save)
      .map(link => ({ text: link.text, href: link.href }));

    sendArticle(article).then(console.log);
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
}

window.customElements.define("billy-editing-page", EditingPage);
