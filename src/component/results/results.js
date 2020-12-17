import { LitElement, html, css } from "lit-element";
import parseJson from "../../js/utils.js";

const mockDataPath = "../../assets/mock/articles.json";

class Results extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {};
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
      }

      .results__hr {
        margin: var(--billy-line-margin);
        height: var(--billy-line-height);
        border: none;
        border-radius: var(--billy-line-radius);
        background-color: var(--billy-color-grey);
      }
    `;
  }

  render() {
    let component = html`
      <div class="results">
        <h1 class="results__title">Results for: %s</h1>
        <hr class="results__hr" />
        <div id="resultItems" class="results__items">
          <slot name="resultItem"></slot>
        </div>
      </div>
    `;

    this._getResultItems();

    return component;
  }

  _getQuery() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("q")) {
      return urlParams.get("q");
    } else {
      return "No query found";
    }
  }

  _parseJson(path) {
    return fetch(path).then((response) => response.json());
  }

  _getResultItems() {
    let queryString = this._getQuery;
    parseJson(mockDataPath).then((json) => {
      for (let num in json.articles) {
        let item = json.articles[num];
        let list = this.shadowRoot.querySelector("#resultItems");

        var result = document.createElement("billy-result-item");
        result.setAttribute("href", item.link);
        result.setAttribute("title", item.title);
        result.setAttribute("description", item.description);
        result.setAttribute("readTime", item.readTime);
        result.setAttribute("lastRevised", item.lastRevised);
        result.setAttribute("headCategory", item.headCategory);
        result.setAttribute("subCategory", item.subCategory);

        list.appendChild(result);
      }
    });
  }
}

customElements.define("billy-results", Results);
