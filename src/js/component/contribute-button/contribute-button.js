import { html, LitElement, css } from "lit-element";

import { defineElement } from "../../custom-element";
import { store } from "../../state/store";

export class ContributeButton extends LitElement {
  constructor() {
    super();

    this.hidden = true;

    store.subscribe(() => this._stateChangedEvent());
  }

  static get properties() {
    return {
      hidden: { type: Boolean },
    };
  }

  static getStyles() {
    return css`
      .link {
        display: flex;
        align-items: center;
        height: 50px;
        padding: var(--billy-contribute-button-padding);
        border: var(--billy-border);
        border-radius: var(--billy-contribute-button-border-radius);
        background-color: var(--billy-color-background-light);
        color: var(--billy-color-button-contribute);
        font-size: var(--billy-contribute-button-font-size);
        font-weight: bold;
        text-align: middle;
        text-decoration: none;
      }
    `;
  }

  render() {
    const state = store.getState();

    return html`
      ${state.login.loggedIn
        ? html`<a class="link" href="/create" aria-label="Artikel aanmaken">Bijdragen</a>`
        : html``}
    `;
  }

  _stateChangedEvent() {
    this.hidden = !store.getState().login;
  }
}

defineElement("billy-contribute-button", ContributeButton);
