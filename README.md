# xapi-youtube
Send Youtube Video interactions to an LRS with xAPI

This script uses [YouTube's iframe API](https://developers.google.com/youtube/iframe_api_reference) to build statements with xapi-youtube-statements.js when events are fired.

These statements can be dispatched to an LRS with xapiwrapper.min.js using a custom ADL.XAPIYoutubeStatements.onStateChangeCallback function.

Check out http://adlnet.github.io/xapi-youtube for a live demo.
