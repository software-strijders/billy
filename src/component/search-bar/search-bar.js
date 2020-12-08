import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

const link = "https://www.un.org/en/sections/issues-depth/climate-change/";

class SearchBar extends LitElement {
  constructor() {
    super();

    this.hideLink = false;
  }

  static get properties() {
    return {
      hideLink: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .searchBar {
        height: 50px;
        display: flex;
        margin: 0;
        box-shadow: 0px 5px 10px var(--billy-color-shadow);
        border-radius: 100px;
        padding: 0;
      }

      .searchBar__input {
        height: 100%;
        margin: 0;
        width: 500px;
        border: none;
        font-size: 20px;
        padding: 0 0 0 20px;
        border-radius: 100px 0 0 100px;
      }

      .searchBar__button {
        height: 100%;
        margin: 0;
        width: 60px;
        font-size: 20px;
        background-color: var(--billy-color-white);
        border: none;
        border-radius: 0 100px 100px 0;
        cursor: pointer;
      }

      .searchBar__link {
        margin-top: 10px;
        color: var(--billy-color-white);
        font-size: 13px;
      }

      .searchBar__link--hide {
        display: none;
      }

      .searchBar__arrow {
        background-color: var(--billy-color-transparent);
        vertical-align: middle;
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="searchBar">
          <input
            aria-label="zoek"
            placeholder="Wat wil je weten?"
            class="searchBar__input input--contrast"
            type="text"
          />
          <button
            @click="${this._search}"
            name="zoek"
            aria-label="Zoek"
            class="searchBar__button"
            type="submit"
          >
            <img
              class="searchBar__arrow"
              src="../assets/arrow-right.svg"
              alt=""
            />
          </button>
        </div>
        <a
          class="searchBar__link ${classMap({
            "searchBar__link--hide": this.hideLink,
          })}"
          href="${link}"
          >Meer weten over klimaatverandering? 🌱</a
        >
      </div>
    `;
  }

  _search(event) {
    /* 
    For demonstration purposes. 
    Needs to be replaced with proper search functionality 
    */
    window.location.href = "/search.html";
  }
}

customElements.define("billy-search-bar", SearchBar);
