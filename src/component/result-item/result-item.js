import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
  static getStyles() {
    return css`
      .resultItem {
        width: 50%;
      }

      .resultItem__title {
        color: var(--billy-color-result-item);
      }
    `;
  }

  render() {
    return html`
      <div class="resultItem">
        <div>
          <h2 class="resultItem__title">Title</h2>
          <p>
            <small>
              <!-- TODO: This <br> should be removed by something else (margins, etc.) -->
              Description <br />
              Description
            </small>
          </p>
          <div>tijd: %.f min - laatst gewijzigd; %s</div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("billy-result-item", ResultItem);
