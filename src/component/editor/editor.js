import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import pell from "pell";

const defaultOptions = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "paragraph",
  "quote",
  "olist",
  "ulist",
  "code",
  "line",
  "link",
  "image",
];

class Editor extends LitElement {
  constructor() {
    super();

    this.title = "";
    this.mainCategory = "";
    this.subCategory = "";

    this.articleHtml = "";
    this.showPreview = false;
  }

  static get properties() {
    return {
      showPreview: { type: Boolean },
      title: { type: String, reflect: true },
      mainCategory: { type: String, reflect: true },
      subCategory: { type: String, reflect: true },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .pell {
        position: relative;
        display: flex;
        flex-direction: column;
        height: var(--billy-editor-height);
        border: var(--billy-border-size) solid var(--billy-color-line-light);
        border-radius: var(--billy-editor-radius);
        overflow: hidden;
      }

      .pell--preview > .pell__actionBar,
      .pell--preview > .pell__content {
        display: none;
      }

      .pell__preview {
        position: absolute;
        height: 100%;
        width: 100%;
      }

      .pell__preview .pell__button:last-child {
        text-align: center;
      }

      .pell__preview .pell__button:last-child:hover {
        background: var(--billy-gradient-background-warning);
        color: var(--billy-color-text-primary-light);
      }

      .pell__text {
        height: 100%;
        margin: var(--billy-editor-text-margin);
        font-size: var(--billy-editor-text-font-size);
        font-weight: bold;
      }

      .pell__actionBar {
        /* Fixes weird spacing issue: */
        display: flex;
        background-color: var(--billy-color-background-light);
        border-bottom: var(--billy-border-size) solid var(--billy-color-line-light);
      }

      .pell__button {
        background-color: var(--billy-color-transparent);
        border: none;
        cursor: pointer;
        height: var(--billy-editor-button-height);
        width: var(--billy-editor-button-width);
        transition: 0.3s;
      }

      .pell__button:hover {
        background-color: var(--billy-editor-button-bg-color-hover);
      }

      .pell__button:last-child {
        position: relative;
        margin: 0 0 0 auto;
        font-size: var(--billy-editor-button-font-size-last-child);
        padding: var(--billy-editor-button-padding-last-child);
      }

      .pell__button:last-child:before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        height: 40px;
        border-left: var(--billy-border-size) solid var(--billy-color-line-light);
      }

      .pell__button--selected {
        background-color: var(--billy-editor-button-bg-color-hover);
      }

      .pell__content {
        height: 100%;
        outline: 0;
        overflow-y: auto;
        padding: var(--billy-editor-content-padding);
        scrollbar-width: thin;
      }

      .pell__content--preview {
        height: calc(100% - var(--billy-editor-button-height));
        padding: 0;
      }

      .pell__content--hidden {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <div class="pell ${classMap({ "pell--preview": this.showPreview })}">
        ${this.showPreview
          ? html`
              <div class="pell__preview">
                <div class="pell__actionBar">
                  <p class="pell__text">Voorbeeld</p>
                  <button
                    class="pell__button"
                    title="Close"
                    type="button"
                    @click="${this._togglePreview}"
                  >
                    x
                  </button>
                </div>
                <div class="pell__content pell__content--preview">
                  <!-- TODO: This should eventually be passed in the state -->
                  <billy-article
                    html="${this.articleHtml}"
                    title="${this.title}"
                    mainCategory="${this.mainCategory}"
                    subCategory="${this.subCategory}"
                    ?isPreview="${true}"
                  ></billy-article>
                </div>
              </div>
            `
          : ""}
      </div>
      <style>
        @import "../css/article.css";
      </style>
    `;
  }

  firstUpdated() {
    pell.init({
      element: this.shadowRoot.querySelector(".pell"),
      onChange: (html) => {
        this.articleHtml = html;
        this.dispatchEvent(new CustomEvent("on-edit", { detail: { html: html } }));
      },
      classes: {
        // We'd like to keep our BEM convention :)
        actionbar: "pell__actionBar",
        button: "pell__button",
        content: "pell__content",
        selected: "pell__button--selected",
      },
      actions: [
        "heading2",
        {
          name: "heading3",
          icon: "<b>H<sub>3</sub></b>",
          title: "Heading 3",
          result: () => pell.exec("formatBlock", "h3"),
        },
        {
          name: "heading4",
          icon: "<b>H<sub>4</sub></b>",
          title: "Heading 4",
          result: () => pell.exec("formatBlock", "h4"),
        },
        ...defaultOptions,
        {
          name: "preview",
          icon: "👁",
          title: "Preview",
          result: () => this._togglePreview(),
        },
      ],
    });
  }

  _togglePreview() {
    this.dispatchEvent(new CustomEvent("on-preview", { detail: !this.showPreview }));
    this.showPreview = !this.showPreview;
  }
}

window.customElements.define("billy-editor", Editor);
