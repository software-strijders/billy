import { LitElement, html, css } from "lit-element";

class App extends LitElement {
  static getStyles() {
    return css`
      :host {
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
      <slot name="header"></slot>
      <slot name="page-layout"></slot>
    `;
  }
}

window.customElements.define("billy-app", App);
