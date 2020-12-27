import { LitElement, html, css } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js"

class Article extends LitElement {
  static get properties() {
    return {
      html:         { type: String, reflect: true },
      title:        { type: String, reflect: true },
      mainCategory: { type: String, reflect: true },
      subCategory:  { type: String, reflect: true },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .article__content {
        padding: 25px;
      }

      .article__title {
        font-size: var(--billy-title-size);
        margin: 0;
      }

      .article__categories {
        margin: 0 0 10px 0;
      }

      .category {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 10px 0 0;
        background-color: var(--billy-color-light-grey);
        border-radius: 20px;
      }

      .category__text {
        margin: 0;
        color: var(--billy-color-font-dark);
        font-size: 14px;
      }

      .article__line {
        height: var(--billy-line-height);
        margin: 15px 0 25px 0;
        background-color: var(--billy-color-grey);
        border: none;
        border-radius: var(--billy-line-radius);
      }

      .article__heading {
        font-size: 22px;
      }

      .article__paragraph {
        font-size: 18px;
        margin: 0 0 25px 0;
      }
    `;
  }

  render() {
    return html`
      <article class="article__content">
        <div class="article__categories">
          <!-- TODO: Make into billy-article-tag component -->
          <div class="category">
            <p class="category__text">${this.mainCategory}</p>
          </div>
          <div class="category">
            <p class="category__text">${this.subCategory}</p>
          </div>
        </div>
        <h1 class="article__title">${this.title}</h1>
        <hr class="article__line" />
        ${unsafeHTML(this.html)}
      </article>
    `;
  }
}

window.customElements.define("billy-article", Article);
