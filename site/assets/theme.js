(function () {
  var root = document.documentElement;
  try {
    var params = new URLSearchParams(location.search);
    var saved = params.get('theme') || localStorage.getItem('tb.theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (params.has('still')) root.setAttribute('data-still', '');
  } catch (e) {
    root.setAttribute('data-theme', 'light');
  }
})();
