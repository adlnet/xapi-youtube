# xapi-youtube
Send Youtube Video interactions to an LRS with xAPI

This script uses [YouTube's iframe API](https://developers.google.com/youtube/iframe_api_reference) to build statements with xapi-youtube-statements.js when events are fired.

These statements can be dispatched to an LRS with xapiwrapper.min.js using a custom ADL.XAPIYoutubeStatements.onStateChangeCallback function.

Check out http://adlnet.github.io/xapi-youtube for a live demo.

##From the [IFrame API](https://developers.google.com/youtube/iframe_api_reference)
###Getting started
The sample HTML page below creates an embedded player that will load a video, play it for six seconds, and then stop the playback. The numbered comments in the HTML are explained in the list below the example.
```html
<!DOCTYPE html>
<html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
```

##Loading a video player
After the API's JavaScript code loads, the API will call the onYouTubeIframeAPIReady function, at which point you can construct a YT.Player object to insert a video player on your page. The HTML excerpt below shows the onYouTubeIframeAPIReady function from the example above:

```javascript
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
```

####The constructor for the video player specifies the following parameters:

1. The first parameter specifies either the DOM element or the id of the HTML element where the API will insert IFrame tag containing the player.

2. The IFrame API will replace the specified element with the iframe element containing the player. This could affect the layout of your page if the element being replaced has a different display style than the inserted iframe element. By default, an iframe displays as an inline-block element. The second parameter is an object that specifies player options. The object contains the following properties:

   * width (number) – The width of the video player. The default value is 640.

   * height (number) – The height of the video player. The default value is 390.
   
   * videoId (string) – The YouTube video ID that identifies the video that the player will load.
   
   * playerVars (object) – The object's properties identify player parameters that can be used to customize the player.
   
   * events (object) – The object's properties identify the events that the API fires and the functions (event listeners) that the API will call when those events occur. In the example, the constructor indicates that the onPlayerReady function will execute when the onReady event fires and that the onPlayerStateChange function will execute when the onStateChange event fires.

As mentioned in the Getting started section, instead of writing an empty <div> element on your page, which the player API's JavaScript code will then replace with an iframe element, you could create the iframe tag yourself.

```html
<iframe id="player" type="text/html" width="640" height="390"
  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
  frameborder="0"></iframe>
```

If you do write the iframe tag, then when you construct the YT.Player object, you do not need to specify values for the width and height, which are specified as attributes of the iframe tag, or the videoId and player parameters, which are are specified in the src URL. As an extra security measure, you should also include the origin parameter to the URL, specifying the URL scheme (http:// or https://) and full domain of your host page as the parameter value. While origin is optional, including it protects against malicious third-party JavaScript being injected into your page and hijacking control of your YouTube player.

The Examples section shows a few more examples for constructing video player objects.

##Examples
See [xapi-youtube-statements.js](https://github.com/adlnet/xapi-youtube/blob/master/src/xapi-youtube-statements.js) for examples on how to integrate with IFrame.

For more information on how to dispach statements to an LRS, see [our example](https://github.com/adlnet/xapi-youtube/blob/master/index.html)

## License
   Copyright &copy;2016 Advanced Distributed Learning

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
