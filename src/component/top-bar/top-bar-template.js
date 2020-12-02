export const template = /*html*/ `
<style>
    @import '../component/top-bar/style.css';
</style>

<header>
  <nav class="topBar">
    <ul class="topBar__list">
      <li class="home"><a class="home__text" href="./home.html">Billy</a></li>
      <li class="item--right"><contrast-toggle></contrast-toggle></li>
      <li class="item"><search-bar></search-bar></li>
      <li class="item"><login-button></login-button></li>
    </ul>
  </nav>
</header>
`
