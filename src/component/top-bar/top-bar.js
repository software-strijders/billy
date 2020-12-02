import {template} from './top-bar-template.js';

class BillyTopBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
        this._shadowRoot.querySelector('search-bar').setAttribute('noshow', "");
        this._shadowRoot.querySelector("login-button").setAttribute('loginButton--large', "");
    }
}

window.customElements.define("billy-top-bar", BillyTopBar);
