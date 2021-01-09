export function defineElement(name, reference) {
  // There were some instances where you'd get an error in the console 
  // mentioning components were already defined. This method eliminates that.
  window.customElements.get(name) || window.customElements.define(name, reference);
}
