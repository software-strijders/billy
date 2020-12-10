import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
  static get properties() {
    return {
      href: { type: String },
    };
  }

  static getStyles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
        width: 100%;
        height: auto;
        cursor: pointer;
      }

      .resultItem__link {
        text-decoration: none;
        color: black;
      }

      .resultItem__title {
        color: var(--billy-color-result-item);
        margin: 0 0 0 0;
      }

      .resultItem__description {
        color: var(--billy-color-font-light);
        margin: 0;
        height: auto;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    `;
  }

  render() {
    return html`
      <a class="resultItem__link" href="${this.href}">
        <h2 class="resultItem__title">Title</h2>
        <p class="resultItem__description">
          <small
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. , sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </small>
        </p>
        <div class="resultItem__info">tijd: %.f min - laatst gewijzigd; %s</div>
      </a>
    `;
  }
}

window.customElements.define("billy-result-item", ResultItem);
