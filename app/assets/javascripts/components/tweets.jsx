$(function() {

  var render = function() {
    var hash = location.hash.replace(/^#/, '');
    var appNode = document.getElementById('app');
    React.unmountComponentAtNode(appNode)
    React.render(<TweetList username={ hash || "casetabs" } />, appNode);
  };
  
  window.onhashchange = render;
  window.onpopstate = render;

  render();
});
