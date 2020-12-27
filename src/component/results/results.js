import { LitElement, html, css } from "lit-element";
import parseJson from "../../js/utils.js";
import levenshtein from "fast-levenshtein";

const mockDataPath = "../../assets/mock/articles.json";

class Results extends LitElement {
  constructor() {
    super();

    this.query = "";
    this.articlePreviews = [];
    this._getResultItems();
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
          ${this.articlePreviews.length === 0
            ? html`<billy-no-result></billy-no-result>`
            : this.articlePreviews.map((article) => {
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

  _getQuery() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("q")) {
      return urlParams.get("q");
    }
  }

  _getResultItems() {
    this.query = this._getQuery();

    parseJson(mockDataPath).then((json) => {
      this.articlePreviews = json.articles.filter((article) => {
        return (
          article.title.search(new RegExp(this.query, "i")) >= 0 ||
          levenshtein.get(article.title, this.query) < 4
        );
      });

      this.requestUpdate();
    });
  }
}

customElements.define("billy-results", Results);
