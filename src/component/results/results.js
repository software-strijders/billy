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

    window.locationchange = () => {
      this.isFinished = false;
      this._getResultItems();
    };
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

      .results__query {
        background: var(--billy-gradient-background-brand);
        -webkit-background-clip: text;
        -webkit-text-fill-color: var(--billy-color-transparent);
      }

      .results__hr {
        margin: var(--billy-line-margin);
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-line-light);
      }

      .result__filter {
        display: none;
      }

      .result__image {
        height: 75%;
        width: auto;
      }

      @media (max-width: 850px) {
        .results {
          padding: 0;
          margin: 0;
        }

        .results__title {
          display: flex;
          align-items: center;
          font-size: 30px;
        }

        .result__filter {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0 0 auto;
          filter: invert(0);
        }
  
        .result__image {
          filter: invert(var(--billy-filter-invert));
        }

        .results__titleWrapper {
          display: flex;
        }
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
      <div class="results">
        <div class="results__titleWrapper">
          <h1 class="results__title">Resultaten voor: <span class="results__query">${this.query} ${this.getCategories()}</span></h1>
          <a aria-label="Zoek via categorieën. Te vinden in het menu" class="result__filter" href="/?jump">
            <img class="result__image" src="/dist/assets/icon/filter-icon-dark.svg">
          </a>
        </div>
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
