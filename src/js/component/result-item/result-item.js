import { LitElement, html, css } from "lit-element";

import { defineElement } from "../../custom-element";

class ResultItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      href: { type: String },
      readTime: { type: Number },
      date: { type: String },
      headCategory: { type: String },
      subCategory: { type: String },
    };
  }

  static getStyles() {
    return css`
      :host {
        position: relative;
        display: flex;
        flex-direction: row;
        margin: 25px 0;
        width: 100%;
        height: auto;
        transition: 0.3s;
        border-radius: 5px;
      }

      :host(:hover) {
        background-color: var(--billy-color-background-light-grey);
      }

      :host(:hover) .line {
        min-width: 5px;
        margin: 0 10px 0 0;
        transform: translateX(0);
        opacity: 1;
      }

      :host(:hover) .resultItem {
        transform: translateX(15px);
      }

      :host(:hover) .resultItem__description {
        color: var(--billy-color-text-secondary-dark);
      }

      .line {
        position: absolute;
        height: 100%;
        min-width: 3px;
        background-color: var(--billy-color-line-light);
        border-radius: 10px;
        transform: translateX(-5px);
        transition: 0.1s;
        opacity: 0;
      }

      .resultItem {
        transition: 0.1s;
        padding: 5px;
        border-radius: 5px;
      }

      .resultItem__link {
        text-decoration: none;
        color: black;
      }

      .resultItem__title {
        color: var(--billy-color-text-primary-dark);
        margin: 0 0 0 0;
      }

      .resultItem__description {
        color: var(--billy-color-text-secondary-dark);
        margin: 5px 0;
        font-size: 15px;
        height: auto;
        width: 98%;
        word-break: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .resultItem__categories {
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: flex-start;
      }

      .resultItem__category {
        background-color: var(--billy-color-background-grey);
        color: var(--billy-color-text-primary-dark);
        text-decoration: none;
        border-radius: 20px;
        border: var(--billy-border);
        margin: 0 10px 0 0;
        padding: 5px 10px;
        cursor: select;
        font-size: 15px;
      }

      .resultItem__info {
        margin-top: 5px;
        color: var(--billy-color-text-primary-dark);
      }

      .navList {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `;
  }

  render() {
    return html`
      <div class="line"></div>
      <article class="resultItem">
        <a aria-label="Artikel: ${this.title}" class="resultItem__link" href="${this.href}">
          <header>
            <h2 aria-hidden="true" class="resultItem__title">${this.title}</h2>
          </header>

          <p aria-hidden="true" class="resultItem__description">${this.description}</p>
        </a>
        <footer>
          <div aria-hidden="true" class="resultItem__info">
            tijd: ${this.readTime} min - laatst gewijzigd: ${this.date}
          </div>
          <nav
            id="resultNavigation"
            aria-label="Categoriëen van het artikel: ${this.title}"
            class="resultItem__categories"
          >
            <ul class="navList">
              <li class="navList__item">
                <a aria-hidden="true" tabindex="-1" class="resultItem__category" href="/search?hc=${this.headCategory}"
                  >${this.headCategory}</a
                >
              </li>
              <li class="navList__item">
                <a aria-hidden="true" tabindex="-1" class="resultItem__category" href="/search?sc=${this.subCategory}"
                  >${this.subCategory}</a
                >
              </li>
            </ul>
          </nav>
        </footer>
      </article>
    `;
  }
}

defineElement("billy-result-item", ResultItem);
