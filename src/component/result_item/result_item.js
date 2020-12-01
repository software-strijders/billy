import {template} from "./result_item_template.js";

class result_item extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
        // this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("result-item", result_item);
