import { LitElement, html, css } from "lit-element";

class App extends LitElement {
  static getStyles() {
    return css`
      @import "../component/app/app.css";
    `;
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot name="page-layout"></slot>
    `;
  }
}

window.customElements.define("billy-app", App);
