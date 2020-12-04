export const template = /*html*/ `
<style>
    @import '../component/top-bar/top-bar.css';
</style>

<header>
  <nav class="topBar">
    <ul class="topBar__list">
      <li class="home"><a class="home__text" href="./home.html">Billy</a></li>
      <li class="item--right"><billy-contrast-toggle></billy-contrast-toggle></li>
      <li class="item"><billy-search-bar hideLink="true"></billy-search-bar></li>
      <li class="item"><billy-login-button large="true"></billy-login-button></li>
    </ul>
  </nav>
</header>
`;
