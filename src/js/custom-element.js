export function defineElement(name, reference) {
  // There were some instances where you'd get an error in the console 
  // mentioning components were already defined. That might have to do 
  // with the way Webpack minifies and generates JS files.
  // As a safeguard, we use this method to eliminate any errors.
  window.customElements.get(name) || window.customElements.define(name, reference);
}
