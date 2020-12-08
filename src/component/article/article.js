import { LitElement, html, css } from "lit-element";

class Article extends LitElement {
  constructor() {
    super();
  }


  static getStyles() {
    return css`
      :host {
        display: flex;
        width: 100%;
      }

      .article__content {
        padding: 25px;
      }

      .article__title {
        font-size: 50px;
        margin: 0;
      }

      .article__categories {
        margin: 0 0 10px 0;
      }

      .category {
        display: inline-block;
        padding: 5px 10px;
        background-color: var(--billy-color-light-grey);
        border-radius: 10px;
      }

      .category__text {
        margin: 0;
        color: var(--billy-color-font-light);
        font-size: 14px;
      }

      .article__line {
        height: var(--billy-line-height);
        margin: 15px 0 25px 0;
        background-color: var(--billy-color-grey);
        border: none;
        border-radius: var(--billy-line-radius);
      }

      .article__heading {
        font-size: 22px;
      }

      .article__paragraph {
        font-size: 18px;
        margin: 0 0 25px 0;
      }
    `;
  }

  render() {
    return html`
      <article class="article__content">
        <div class="article__categories">
          <div class="category">
            <p class="category__text">Gebruikersinteractie</p>
          </div>
        </div>
        <h1 class="article__title">User Story</h1>
        <hr class="article__line" />
        <h2 class="article__heading">Onderwerp (What)</h2>
        <p class="article__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
          euismod orci, vitae viverra massa. Sed at mauris a felis bibendum
          viverra a vitae risus. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Suspendisse efficitur id
          nisl eget euismod. In hac habitasse platea dictumst. Suspendisse
          gravida imperdiet tempus. Nulla quis eros eu est varius mollis. Sed
          sollicitudin vulputate felis, laoreet pretium purus vestibulum
          maximus. Sed eleifend nisi vitae imperdiet faucibus. Pellentesque
          lacus neque, vehicula eget pulvinar vitae, laoreet a quam. Ut eu
          accumsan sem. Pellentesque luctus auctor metus consectetur dictum.
          Integer ac ipsum urna. Donec et molestie turpis. Praesent dapibus
          libero at velit facilisis, eget consequat diam venenatis. Duis aliquet
          porta malesuada. Suspendisse non efficitur ipsum. Nam et velit sit
          amet tortor placerat elementum non sit amet est. Integer aliquet nibh
          nec felis viverra pretium. Etiam accumsan ante non libero posuere
          luctus. Mauris volutpat urna at sem hendrerit, a interdum eros
          consequat. Duis eget massa urna. Etiam accumsan elit lorem, in rhoncus
          ligula porta sed. Sed iaculis cursus felis, eu rutrum nisi vestibulum
          eget. Phasellus vulputate magna porttitor semper porta. Ut et mauris
          mattis, pulvinar nulla eget, imperdiet metus. Nullam vel eros nisi.
          Sed vitae dignissim ipsum. Donec vitae massa id libero ullamcorper
          finibus. Donec blandit auctor purus, eget eleifend magna tincidunt
          quis.
        </p>
        <h2 class="article__heading">Doel (Why)</h2>
        <p class="article__paragraph">
          Mauris vulputate mauris tortor, in vulputate ligula finibus vitae. In
          semper dolor eu dui sagittis, in maximus turpis ullamcorper. Fusce a
          porta sem, eu aliquet ipsum. Integer nec pellentesque nisi. Sed non
          arcu odio. Aenean sit amet massa ex. Vestibulum sagittis, eros vel
          bibendum aliquet, quam tortor tincidunt diam, et suscipit justo libero
          vehicula neque. Etiam blandit dui ac lacus semper faucibus. Donec in
          ipsum quis nibh imperdiet suscipit nec sed velit. Quisque interdum
          scelerisque cursus. Pellentesque urna libero, congue et ullamcorper
          nec, luctus ac nisl. Quisque vel fermentum felis. Nam pellentesque
          vulputate venenatis. Mauris feugiat sodales magna. Vivamus molestie
          volutpat est. Etiam faucibus risus vitae turpis laoreet, nec auctor
          mauris malesuada. Duis eget magna quis lacus congue tincidunt eu id
          felis. Nulla ac ultricies arcu. Donec diam lectus, maximus vel
          pharetra non, rutrum nec lorem. Aliquam erat volutpat. Donec non mi
          tortor. Donec eget cursus mi, ut convallis justo. Suspendisse eu
          sapien ut ipsum molestie gravida. In efficitur non ipsum a ornare.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas.
        </p>
        <h2 class="article__heading">Beschrijving (How)</h2>
        <p class="article__paragraph">
          Etiam blandit dui ac lacus semper faucibus. Donec in ipsum quis nibh
          imperdiet suscipit nec sed velit. Quisque interdum scelerisque cursus.
          Pellentesque urna libero, congue et ullamcorper nec, luctus ac nisl.
          Quisque vel fermentum felis. Nam pellentesque vulputate venenatis.
          Mauris feugiat sodales magna. Vivamus molestie volutpat est. Etiam
          faucibus risus vitae turpis laoreet, nec auctor mauris malesuada. Duis
          eget magna quis lacus congue tincidunt eu id felis. Nulla ac ultricies
          arcu. Donec diam lectus, maximus vel pharetra non, rutrum nec lorem.
          Aliquam erat volutpat. Donec non mi tortor. Donec eget cursus mi, ut
          convallis justo. Suspendisse eu sapien ut ipsum molestie gravida. In
          efficitur non ipsum a ornare. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <h2 class="article__heading">HBO-i Beroepstaak of Vaardigheid</h2>
        <p class="article__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
          euismod orci, vitae viverra massa. Sed at mauris a felis bibendum
          viverra a vitae risus. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Suspendisse efficitur id
          nisl eget euismod. In hac habitasse platea dictumst. Suspendisse
          gravida imperdiet tempus. Nulla quis eros eu est varius mollis. Sed
          sollicitudin vulputate felis, laoreet pretium purus vestibulum
          maximus. Sed eleifend nisi vitae imperdiet faucibus. Pellentesque
          lacus neque, vehicula eget pulvinar vitae, laoreet a quam. Ut eu
          accumsan sem. Pellentesque luctus auctor metus consectetur dictum.
          Integer ac ipsum urna. Donec et molestie turpis. Praesent dapibus
          libero at velit facilisis, eget consequat diam venenatis. Duis aliquet
          porta malesuada. Suspendisse non efficitur ipsum. Nam et velit sit
          amet tortor placerat elementum non sit amet est. Integer aliquet nibh
          nec felis viverra pretium. Etiam accumsan ante non libero posuere
          luctus. Mauris volutpat urna at sem hendrerit, a interdum eros
          consequat. Duis eget massa urna. Etiam accumsan elit lorem, in rhoncus
          ligula porta sed. Sed iaculis cursus felis, eu rutrum nisi vestibulum
          eget. Phasellus vulputate magna porttitor semper porta. Ut et mauris
          mattis, pulvinar nulla eget, imperdiet metus. Nullam vel eros nisi.
          Sed vitae dignissim ipsum. Donec vitae massa id libero ullamcorper
          finibus. Donec blandit auctor purus, eget eleifend magna tincidunt
          quis.
        </p>
      </article>
    `;
  }
}

window.customElements.define("billy-article", Article);
