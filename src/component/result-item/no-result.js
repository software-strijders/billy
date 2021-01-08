import { LitElement, html, css } from "lit-element";

class NoResultItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      href: { type: String },
      readTime: { type: Number },
      lastRevised: { type: String },
      headCategory: { type: String },
      subCategory: { type: String },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0;
        width: 100%;
        user-select: none;
        height: auto;
      }

      .noResultItem__title {
        color: var(--billy-color-text-secondary-dark);
        font-size: 300px;
        margin: 10px 0;
      }

      .noResultItem__description {
        color: var(--billy-color-text-secondary-dark);
        font-size: 50px;
        margin: 0;
        height: auto;
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
        margin: 0 10px 0 0;
        padding: 5px 10px;
        cursor: select;
        font-size: 15px;
      }
    `;
  }

  render() {
    return html`
      <div class="resultItem__categories">
          <a class="resultItem__category" href="/search?hc=${this.getHeadCategory()}">${this.getHeadCategory()}</a>
          <a class="resultItem__category" href="/search?sc=${this.getSubCategory()}">${this.getSubCategory()}</a>
      </div>
      <h2 class="noResultItem__title">404</h2>
      <p class="noResultItem__description">No results found</p>
    `;
  }

  getHeadCategory() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("hc")) {
      return urlParams.get("hc");
    }
  }

  getSubCategory() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sc")) {
      return urlParams.get("sc");
    }
  }
}

window.customElements.define("billy-no-result", NoResultItem);
