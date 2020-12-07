// This import is very important (get it), and should be imported by default.
import { LitElement, html, css } from "lit-element";
// This one should only be imported when you actually need it, though.
import { classMap } from "lit-html/directives/class-map.js";

// This files serves as an example, it should probably be removed soon.
class Example extends LitElement {
  constructor() {
    super();

    this.text = "";
    setTimeout(() => {
      this.text = "Test text";
      // This method can be used to 'force' an update, that wouldn't be reflected by a property.
      // See  for more information about lifecycles.
      this.requestUpdate();
    }, 5000);
  }

  // This is where you can define the properties.
  // See https://lit-element.polymer-project.org/guide/properties for more information.
  static get properties() {
    return {
      large: { type: Boolean },
      red: { type: Boolean },
      // text:   { type: String }
    };
  }

  // This method is used to define the styling. If you use this method,
  // multiple instances of this webcomponent will use the same styling.
  static getStyles() {
    // I just noticed that we shouldn't include our CSS styling like this, since it can cause flashing pages.
    // Source: https://lit-element.polymer-project.org/guide/styles#external-stylesheet
    return css`
      .example__text {
        font-size: 100px;
        color: green;
      }

      .example__text--large {
        font-size: 200px;
      }

      .example__text--red {
        color: red;
      }
    `;
  }

  // This method is called multiple times. For example, if the large property is changed, this method will be called.
  render() {
    return html`
      <div
        @click="${this.handleClick}"
        class="example__text ${classMap({
          "example__text--large": this.large,
          "example__text--red": this.red,
        })}"
      >
        ${this.text}
        <div class="example__h1">
          <slot name="text"></slot>
        </div>
      </div>
    `;
  }

  handleClick() {
    // Handle click, and do stuff :)
  }
}

// Defining elements is still done in the same way.
window.customElements.define("billy-example", Example);
