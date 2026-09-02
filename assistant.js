// Loads the docs AI assistant widget (celo-org/docs#2250).
//
// Mintlify includes every .js file in the content directory on all pages and
// does not support a raw <script src> tag in MDX, so the widget is injected
// programmatically. See AGENTS.md §1 for that mechanism.
(function () {
  var WIDGET_SRC = 'https://docs-assistant.celo.org/widget.js';

  // The assistant API only accepts these origins. Injecting anywhere else
  // renders a button that collects a question and then fails CORS, so limit
  // the widget to hosts where it actually works — production plus local
  // `mint dev`, which AGENTS.md asks contributors to run before a PR.
  var HOSTS = ['docs.celo.org', 'localhost', '127.0.0.1'];
  if (HOSTS.indexOf(location.hostname) === -1) return;

  var script = document.createElement('script');
  script.src = WIDGET_SRC;
  // The widget reads this rather than inferring its own origin.
  script.dataset.apiUrl = 'https://docs-assistant.celo.org/api/chat';
  script.referrerPolicy = 'strict-origin';
  script.onerror = function () {
    // An ad blocker, an outage, or a blocked request otherwise leaves no
    // button and no explanation for a reader told one would be there.
    console.warn(
      '[celo-docs] The AI assistant failed to load. It may be blocked by an extension or temporarily unavailable.'
    );
  };
  document.head.appendChild(script);
})();
