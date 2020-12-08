import { LitElement, html, css } from "lit-element";

class App extends LitElement {
  static getStyles() {
    return css`
      .app__main {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    `;
  }

  render() {
    return html`
      <header>
        <slot name="header"></slot>
      </header>
      <slot name="page-layout"></slot>
    `;
  }
}

window.customElements.define("billy-app", App);
