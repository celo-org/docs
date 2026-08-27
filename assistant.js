// Loads the docs AI assistant widget on every page (celo-org/docs#2250).
//
// Mintlify includes every .js file in the content directory on all pages, but
// does not support a raw <script src> tag in MDX, so the widget is injected
// programmatically. The widget itself and the API it calls are served from the
// assistant deployment; it derives its own API origin from this src.
(function () {
  var WIDGET_SRC = 'https://docs-assistant.celo.org/widget.js';

  var script = document.createElement('script');
  script.src = WIDGET_SRC;
  script.async = true;
  document.head.appendChild(script);
})();
