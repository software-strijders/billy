import { LitElement, html, css } from "lit-element";
import levenshtein from "fast-levenshtein";

import { getArticles } from "../../js/api/api.js";
import { defineElement } from "../../js/custom-element.js";

class Results extends LitElement {
  constructor() {
    super();

    this.isFinished = false;
    this.query = "";
    this.previews = [];
    this._getResultItems();

    window.addEventListener('locationchange', () => {
      this.isFinished = false;
      this._getResultItems();
    });
  }

  static get properties() {
    return {
      isFinished: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      :host {
        width: 100%;
      }

      .results {
        padding: 30px;
        text-align: left;
      }

      .results__title {
        font-size: var(--billy-title-size);
        color: var(--billy-color-results-title);
        text-shadow: none;
        margin: 0;
      }

      .results__hr {
        margin: var(--billy-line-margin);
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-line-light);
      }

      .results__query {
        background: var(--billy-gradient-background-brand);
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--billy-color-transparent);
      }
    `;
  }

  render() {
    return html`
      <div class="results">
        <h1 class="results__title">
          Resultaten voor: <span class="results__query">${this.query} ${this.getCategories()} </span>
        </h1>
        <hr class="results__hr" />
        <div id="resultItems" class="results__items">
          ${this.previews.length === 0 && this.isFinished
            ? html`<billy-no-result></billy-no-result>`
            : this.previews.map((article) => {
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

  _filterByText(text) {
    if (text === null) return;

    this.query = text;
    this.previews = this.previews.filter((article) => {
      return (
        // Check if the literal text is in the title.
        article.title.search(new RegExp(text, "i")) >= 0 ||
        // Check if there is text that looks like what was searched.
        levenshtein.get(article.title, text) < 4
      );
    });
  }

  _filterByCategories(headCategory, subCategory) {
    if (headCategory === null) return;

    this.previews = this.previews.filter((article) => {
      return subCategory === null
        ? article.headCategory === headCategory
        : article.headCategory === headCategory &&
            article.subCategory === subCategory;
    });
  }

  _getResultItems() {
    getArticles().then((json) => {
      this.previews = json.articles;

      // Filter based on the (optional) query parameters
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("q")) this._filterByText(urlParams.get("q"));
      if (urlParams.has("hc"))
        this._filterByCategories(urlParams.get("hc"), urlParams.get("sc"));

      // Only render when filtering has finished.
      this.isFinished = true;
    });
  }

  getCategories() {
    let urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has("hc") && !urlParams.has("sc"))
      return urlParams.get("hc");
    else if(urlParams.has("hc") && urlParams.has("sc"))
      return urlParams.get("hc") + ", " + urlParams.get("sc");
    else if(!urlParams.has("hc") && !urlParams.has("q"))
      return "Alles";
  }
}

defineElement("billy-results", Results);
