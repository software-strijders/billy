import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

class EditingPage extends LitElement {
  constructor() {
    super();

    this._title = "";
    this._mainCategory = "Analyse";
    this._subCategory = "Gebruikersinteractie";
    this._htmlData = "";
  }

  static get properties() {
    return {
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
        transition: background 0.3s;
      }

      .form__select:hover {
        background-position: var(--billy-edit-page-form-select-background-position-hover);
      }

      .form__button {
        padding: var(--billy-edit-page-form-button-padding);
        border-radius: var(--billy-edit-page-radius);
        background: none;
        background-image: var(--billy-gradient);
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
            <input id="title" class="form__input" type="text"/>
          </label>
        </div>
        <div class="form__wrapper form__wrapper--select">
          <div class="form__wrapper">
            <label class="form__label">
              <h2 class="form__labelTitle">Hoofdcategorie</h2>
              <select id="mainCategory" class="form__select">
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
              <select id="subCategory" class="form__select">
                <option>Gebruikersinteractie</option>
                <option>Organisatie Processen</option>
                <option>Infrastructuur</option>
                <option>Software</option>
                <option>Hardware Interfacing</option>
              </select>
            </label>
          </div>
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
          <button @click="${this._handleSaveClick}" class="form__button" type="button">Opslaan</button>
        </div>
      </form>
    `;
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

  _handleSaveClick() {
    // When saving, we should validate all fields here.
    // Afterwards there should probably go a request to an api 
    // OR we put it in localStorage and keep it in the state (redux).

    // TODO: #10 (create article)
  }
}

window.customElements.define("billy-editing-page", EditingPage);