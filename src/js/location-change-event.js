// Fires an event when the location (URL) changes.
// This is used in the results page, since the router
// wasn't showing the new component when the URL changed.
// This event *does* make it show the component.
// ---
// https://stackoverflow.com/a/52809105
history.pushState = (f => function pushState(){
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.pushState);

history.replaceState = (f => function replaceState(){
  var ret = f.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  window.dispatchEvent(new Event('locationchange'));
  return ret;
})(history.replaceState);

window.addEventListener('popstate', () => {
  window.dispatchEvent(new Event('locationchange'));
});
