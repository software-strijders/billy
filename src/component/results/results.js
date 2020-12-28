import { LitElement, html, css } from "lit-element";
import parseJson from "../../js/utils.js";
import levenshtein from "fast-levenshtein";

const mockDataPath = "../../assets/mock/articles.json";

class Results extends LitElement {
  constructor() {
    super();

    this.isFinished = false;
    this.query = "";
    this.previews = [];
    this._getResultItems();
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
        text-shadow: none;
        margin: 0;
      }

      .results__hr {
        margin: var(--billy-line-margin);
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-grey);
      }

      .results__query {
        background: var(--billy-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  }

  render() {
    return html`
      <div class="results">
        <h1 class="results__title">
          Results for: <span class="results__query">${this.query}</span>
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
    parseJson(mockDataPath).then((json) => {
      this.previews = json.articles;

      // Filter based on the (optional) query parameters
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("q"))
        this._filterByText(urlParams.get("q"));
      if (urlParams.has("hc"))
        this._filterByCategories(urlParams.get("hc"), urlParams.get("sc"));

      // Only render when filtering has finished.
      this.isFinished = true;
    });
  }
}

customElements.define("billy-results", Results);
