import { template } from "./contrast-toggle-template.js";

class ContrastButton extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.addEventListener("click", this.toggleSwitch);
  }

  toggleSwitch() {
    const slider = this.shadowRoot.querySelector("#slider");
    slider.classList.toggle("slider--on");
    this.toggleAttribute("on");
  }
}

customElements.define("contrast-toggle", ContrastButton);
