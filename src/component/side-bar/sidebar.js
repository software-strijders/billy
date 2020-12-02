import {template} from "./sidebar-template.js";

class BillySidebar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
    }
}

window.customElements.define("billy-sidebar", BillySidebar);
