/**
 * Main JavaScript for handling Chromecast interactions and content injection.
 */

window.onload = function() {
  cast.receiver.logger.setLevelValue(0);
  var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  console.log('Starting Receiver Manager');

  // ... existing Chromecast setup code ...

  // Listen for a message from the sender to load a URL
  window.messageBus.onMessage = function(event) {
    console.log('Message [' + event.senderId + ']: ' + event.data);

    // When a 'load' type message is received, set the iframe source to the Binance URL
    if (event.data['type'] == 'load') {
      $('#dashboard').attr('src', event.data['url']);
    }
  };

  // Inject custom JavaScript into the iframe after it has loaded
  $('#dashboard').on('load', function() {
    var iframe = $('#dashboard').get(0);
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // Inject the custom JavaScript to manipulate the Binance page's DOM
    if (iframeDocument.body) {
      var injectedScript = iframeDocument.createElement('script');
      injectedScript.textContent = `
        document.body.style.backgroundColor = '#000';
        document.documentElement.style.backgroundColor = '#000';
        document.querySelectorAll('body *').forEach(el => {
            el.style.display = 'none';
            el.style.width = '0';
            el.style.height = '0';
        });
        let targetElement = document.querySelector('.showPrice.css-gvje9d');
        if (targetElement) {
            targetElement.style.display = 'flex';
            targetElement.style.alignItems = 'center';
            targetElement.style.fontSize = '400px';
            targetElement.style.width = '1880px';
            targetElement.style.height = '500px';
            let parentElement = targetElement.parentElement;
            while (parentElement) {
                parentElement.style.display = '';
                parentElement.style.width = '';
                parentElement.style.height = '';
                parentElement.style.padding = '';
                parentElement = parentElement.parentElement;
            }
        }
        let jpClassElement = document.querySelector('.jp-class.css-1mcsr0w');
        if (jpClassElement) {
            jpClassElement.style.display = 'block';
            jpClassElement.style.backgroundColor = '#000';
        }
        document.documentElement.style.width = '1155px';
        document.documentElement.style.height = '320px';
        let css146tzjsElement = document.querySelector('.css-1mcsr0w');
        if (css146tzjsElement) {
            css146tzjsElement.style.backgroundColor = '#000';
            css146tzjsElement.querySelectorAll('*').forEach(child => {
                child.style.backgroundColor = '#000';
            });
        }
      `;
      iframeDocument.body.appendChild(injectedScript);
    }
  });

  // Start the Chromecast receiver manager
  castReceiverManager.start({statusText: 'Application is starting'});
  console.log('Receiver Manager started');
};
