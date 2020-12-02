import { LitElement, html, css } from "lit-element";

class Article extends LitElement {
  constructor() {
    super();

    /** @type {String} */
    this.epic = null;
  }


  static getStyles() {
    return css`@import "./component/article/article.css";`;
  }

  render() {
    return html`
      <div class="article">
        <h1>Hallo people</h1>
      </div>
    `;
  }
}

window.customElements.define("billy-article", Article);
