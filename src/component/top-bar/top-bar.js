import {template} from './top-bar-template.js';

class TopBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this._shadowRoot.innerHTML = template;
        this._shadowRoot.querySelector('billy-search-bar').setAttribute('noshow', "");
        this._shadowRoot.querySelector("billy-login-button").setAttribute('loginButton--large', "");
    }
}

window.customElements.define("billy-top-bar", TopBar);
