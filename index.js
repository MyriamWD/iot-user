var pubnub = new PubNub({
	subscribeKey: "sub-c-bc2f4ab8-e049-11ea-8b40-62170124e0a9",
	publishKey: "pub-c-ac3e3e5e-19cc-40e1-ac62-f672c4b3e0b9",
	uuid: "myUniqueUUID",
	ssl: true
})

var channel = 'led';
var blinkState = true;
var button = document.querySelector('button');

pubnub.subscribe({
    channels: [channel],
    withPresence: true
  });

button.addEventListener( 'click', function(e){
    pubnub.publish({
        channel : channel,
        message : {'blink' : blinkState}
      },
      function(status) {
        if (status.error) {
            console.log(status)
        }
        else {
          blinkState = !blinkState;
          displayButton(blinkState)
        }
      });
});


function displayButton(blinkState) {
  if (blinkState) {
    button.className = 'on'
    button.innerHTML = 'Turn On 💡'
  } else {
    button.className = 'off'
    button.innerHTML = 'Turn Off 💤'
  }
};
