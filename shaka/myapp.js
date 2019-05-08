// myapp.js

var manifestUri ='http://csm-e-ces1eurxaws101j8-542t02jowcrz.cds1.yospace.com/csm/builder/170808033,170808028,170053561,170053531,proxy.1,170053531,170808028,170053531,proxy.2,170808039.mpd?yo.p.ci=170053351&yo.p.fn=YWRzbWFydC9QT0MvREFTSC9oMjY0X3YyLm1wZA==&yo.p.bp=MANIFEST&yo.p.cu=Q3lPUQ==&yo.ap=http%3A%2F%2Flinear001-gb-dash1-stg-cl.cdn.skycdp.com%2Fadsmart%2Ftranscode%2FDASH%2F&yo.up=http%3A%2F%2Flinear001-gb-dash1-stg-cl.cdn.skycdp.com%2Fadsmart%2FPOC%2FDASH%2F';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);
