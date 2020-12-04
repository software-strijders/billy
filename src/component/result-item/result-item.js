import { LitElement, html, css } from "lit-element";

class ResultItem extends LitElement {
  static getStyles() {
    return css`
      @import "../component/result-item/result-item.css";
    `;
  }

  render() {
    return html`
      <div class="resultItem">
        <div>
          <h2 class="resultItem__title">Title</h2>
          <p>
            <small>
              <!-- This <br> should be removed by something more elegant -->
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
