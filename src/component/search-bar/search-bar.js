import { Router } from "@vaadin/router";
import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../js/custom-element";

const link = "https://www.un.org/en/sections/issues-depth/climate-change/";

class SearchBar extends LitElement {
  constructor() {
    super();

    this.hideLink = false;
  }

  static get properties() {
    return {
      hideLink: { type: Boolean },
      topBar: { type: Boolean },
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
        border: var(--billy-color-border-search-bar);
        padding: 0;
      }

      .searchBar__input {
        height: 100%;
        margin: 0;
        width: 500px;
        border: none;
        color: var(--billy-color-text-primary-dark);
        font-size: 20px;
        padding: 0 0 0 20px;
        border-radius: 100px 0 0 100px;
        background-color: var(--billy-color-background-light);
      }

      .searchBar__button {
        display: flex;
        justify-content: center;
        height: 100%;
        margin: 0;
        width: 60px;
        font-size: 20px;
        background-color: var(--billy-color-background-light);
        border: none;
        border-radius: 0 100px 100px 0;
        cursor: pointer;
      }

      .searchBar__link {
        margin-top: 10px;
        color: var(--billy-color-text-primary-light);
        font-size: 13px;
      }

      .searchBar__link--hide {
        display: none;
      }

      .searchBar__arrow {
        align-self: center;
        height: 30px;
        background-color: var(--billy-color-transparent);
        filter: invert(var(--billy-filter-invert));
      }

      .mobileButton {
        display: none;
      }

      @media (max-width: 850px) {
        .searchBar {
          width: 350px;
        }

        .wrapper {
          margin: 0;
        }

        .searchBar__arrow {
          height: 20px !important;
          padding-right: 20px;
          padding-left: 5px;
        }

        .wrapper--topBar .mobileButton {
          display: block;
          background: none;
          border: none;
          padding: 0;
          height: 50px;
        }

        .wrapper--topBar .mobileButton__image {
          height: 40px;
          width: 40px;
        }

        .wrapper--topBar .searchBar {
          display: none;
        }

        .wrapper--topbar {
          margin: 0;
          
        }

        .wrapper--topBar .searchBar {
          width: 40px;
        }

        :host {
          margin-left: 15px;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper ${classMap({ "wrapper--topBar": this.topBar })}">
        <div class="searchBar ">
          <input
            @keydown="${this._handleKeyDown}"
            id="searchInput"
            aria-label="Zoek"
            placeholder="Wat wil je weten?"
            class="searchBar__input"
            type="text"
          />
          <a href="/search" name="zoek" aria-label="Zoek" class="searchBar__button" type="submit">
            <img class="searchBar__arrow" src="/dist/assets/icon/arrow-right.svg" alt="" />
          </a>
        </div>
        <button class="mobileButton">
          <img class="mobileButton__image" src="/dist/assets/icon/search-icon.svg" />
        </button>

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

  _getSearchInput() {
    return this.shadowRoot.querySelector(".searchBar__input").value;
  }

  _handleKeyDown(event) {
    if (event.keyCode === 13) {
      this._search();
    }
  }

  _search() {
    Router.go({
      pathname: "/search",
      search: `?q=${this._getSearchInput()}`,
    });
  }
}

defineElement("billy-search-bar", SearchBar);
