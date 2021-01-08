import { html, LitElement, css } from "lit-element";
import { store } from "../../js/state/store";

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
        border-radius: var(--billy-contribute-button-border-radius);
        background-color: var(--billy-color-background-light);
        color: var(--billy-contribute-button-color);
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
        ? html`<a class="link" href="/create">Bijdragen</a>`
        : html``}
    `;
  }

  _stateChangedEvent() {
    this.hidden = !store.getState().login;
  }
}

window.customElements.define("billy-contribute-button", ContributeButton);