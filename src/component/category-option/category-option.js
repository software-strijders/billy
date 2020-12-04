import { template } from "./category-option-template.js";

class CategoryOption extends HTMLElement {
    constructor() {
        super();
        
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.innerHTML = template;
    }

    connectedCallback() {
        if (this.hasAttribute("icon")) {
            this._shadowRoot.querySelector("img").setAttribute("src", this.getAttribute("icon"));
        }

        if (this.hasAttribute("text")) {
            this._shadowRoot.querySelector("p").innerHTML = this.getAttribute("text");
        }

        if (this.hasAttribute("href")) {
            console.log(this.getAttribute("href"))
            this._shadowRoot.querySelector("div").setAttribute("href", this.getAttribute("href"));
        }
    }
}

customElements.define("billy-category-option", CategoryOption);
