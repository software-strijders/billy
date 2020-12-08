import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
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

      .resultItem__title {
        color: var(--billy-color-result-item);
        margin: 0 0 0 0;
      }

      .resultItem__description {
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
      <h2 @click="${this._handleClick}" class="resultItem__title">Title</h2>
      <p class="resultItem__description">
        <small
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. , sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </small>
      </p>
      <div class="resultItem__info">tijd: %.f min - laatst gewijzigd; %s</div>
    `;
  }

  _handleClick(event) {
    window.location.href = "/article";
  }
}

window.customElements.define("billy-result-item", ResultItem);
