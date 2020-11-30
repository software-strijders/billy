export const template = /*html*/ `
<style>
    @import '../component/search-bar/search-bar.css';
</style>
<div class="wrapper">
  <div class="searchBar searchBar--contrast">
    <input aria-label="zoek" placeholder="Wat wil je weten?" class="searchBar__input input--contrast" type="text">
    <button  name="zoek" class="searchBar__button" type="submit"><img class="searchBar__arrow" src="../assets/arrow-right.svg" alt="Search arrow"/></button>
  </div>
  <a class="searchBar__link link--show" href="https://www.un.org/en/sections/issues-depth/climate-change/">Meer weten over klimaatverandering? 🌱</a>
</div>
`;
