import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

import { defineElement } from "../../js/custom-element";

class HorizontalLine extends LitElement {
  static get properties() {
    return {
      popout: {type: Boolean},
    };
  }

  static getStyles() {
    return css`
      hr {
        height: var(--billy-line-height);
        margin: 15px 0 25px 0;
        background-color: var(--billy-color-line-light);
        border: none;
        border-radius: var(--billy-line-radius);
      }

      .hr--popout {
        margin: 8px 0;
      }
    `;
  }

  render() {
    return html` 
      <hr class="${classMap({ "hr--popout": this.popout })}"/>
    `;
  }
}

defineElement("billy-hr", HorizontalLine);
