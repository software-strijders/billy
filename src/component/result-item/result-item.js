import {template} from "./result-item-template.js";

class BillyResultItem extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
        // this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("billy-result-item", BillyResultItem);
