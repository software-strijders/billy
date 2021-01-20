import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import pell from "pell";

import { store } from "../../state/store";
import { defineElement } from "../../custom-element";

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
    this._checkIfInEditingMode();
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
        color: var(--billy-color-text-primary-dark);
      }

      .pell__actionBar {
        /* Fixes weird spacing issue: */
        display: flex;
        background-color: var(--billy-color-background-light);
        border-bottom: var(--billy-border-size) solid var(--billy-color-line-light);
      }

      .pell__button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--billy-color-background-light);
        color: var(--billy-color-text-primary-dark);
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
        display: block;
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
        border: var(--billy-border-codeblock);
        border-left: var(--billy-border-size) solid var(--billy-color-line-light);
      }

      .pell__button--selected {
        background-color: var(--billy-editor-button-bg-color-hover);
        color: var(--billy-color-selected-contrast)
      }

      .pell__content {
        height: 100%;
        outline: 0;
        overflow-y: auto;
        word-break: break-word;
        text-overflow: ellipsis;
        padding: var(--billy-editor-content-padding);
        scrollbar-width: thin;
        color: var(--billy-color-text-primary-dark);
      }

      .pell__content--preview {
        height: calc(100% - var(--billy-editor-button-height));
        padding: 0;
      }

      .pell__content--hidden {
        display: none;
      }

      .pell__image {
        height: 15px;
        width: auto;
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
        @import "/dist/css/article.css";
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
          name: "outdent",
          icon: "<img class='pell__image' src='/dist/assets/icon/outdent.svg' alt='outdent'>",
          title: "Outdent",
          result: () => pell.exec("outdent"),
        },
        {
          name: "preview",
          icon: "👁",
          title: "Preview",
          result: () => this._togglePreview(),
        },
      ],
    });

    // This fixes the caret dissapearing from the content-editable pell element in FireFox.
    // Normally I don't really like to add browser-specific code, but we don't have a choice here.
    // Looking on the internet I found the following related posts about this issue, though none of the
    // solutions worked (except this one...).
    // ---
    // https://stackoverflow.com/questions/27093136/firefox-contenteditable-cursor-issue
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1146881
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1175495
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1417012
    // https://bugzilla.mozilla.org/show_bug.cgi?id=579760
    if (navigator.userAgent.indexOf("Firefox") > 0) {
      const pellRoot = this.shadowRoot.querySelector(".pell__content");
      // The solution does the following:
      // - Add listeners to all pell-generated buttons
      // - When a button is clicked, remove the contenteditable attribute for 1ms
      // - Then re-add it, this makes the cursor show on the right position again.
      this.shadowRoot.querySelectorAll(".pell__button").forEach(button => {
        button.addEventListener("click", () => {
          pellRoot.setAttribute("contenteditable", false);
          setTimeout(() => {
            pellRoot.setAttribute("contenteditable", true);
            pellRoot.focus();
          }, 1);
        });
      });
    }
  }

  _togglePreview() {
    this.dispatchEvent(new CustomEvent("on-preview", { detail: !this.showPreview }));
    this.showPreview = !this.showPreview;
  }

  _checkIfInEditingMode() {
    store.subscribe(() => {
      if (store.getState().editMode.inEditMode) {
        this.articleHtml = store.getState().editMode.articleContent;
        this.title = store.getState().editMode.articleTitle;
        this.shadowRoot.querySelector(".pell__content[contenteditable='true']").innerHTML = this.articleHtml;
      }
    });
  }
}

defineElement("billy-editor", Editor);
