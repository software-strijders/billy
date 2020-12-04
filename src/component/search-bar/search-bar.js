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
      @import "../component/search-bar/search-bar.css";
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="searchBar">
          <input aria-label="zoek" placeholder="Wat wil je weten?" class="searchBar__input input--contrast" type="text" />
          <button name="zoek" class="searchBar__button" type="submit">
            <img class="searchBar__arrow" src="../assets/arrow-right.svg" alt="" />
          </button>
        </div>
        <a class="searchBar__link ${classMap({ "searchBar__link--hide": this.hideLink })}" href="${link}">Meer weten over klimaatverandering? 🌱</a>
      </div>
    `;
  }
}

customElements.define("billy-search-bar", SearchBar);
