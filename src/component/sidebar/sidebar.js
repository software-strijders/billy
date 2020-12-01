import {template} from "./sidebar_template.js";

class sidebar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
    }
}

window.customElements.define("custom-sidebar", sidebar);
