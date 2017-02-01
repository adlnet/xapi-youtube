# xapi-youtube
Send Youtube Video interactions to an LRS with xAPI

This script uses [YouTube's iframe API](https://developers.google.com/youtube/iframe_api_reference) to build statements with xapi-youtube-statements.js when events are fired.

These statements can be dispatched to an LRS with xapiwrapper.min.js using a custom ADL.XAPIYoutubeStatements.onStateChangeCallback function.

Check out http://adlnet.github.io/xapi-youtube for a live demo.

This script also uses [xAPI Launch](https://github.com/adlnet/xapi-launch) to establish the connection to the LRS from our application.

## Installing

`git clone https://github.com/adlnet/xapi-youtube` or download using the download [link](https://github.com/adlnet/xapi-youtube/archive/master.zip) 

## Configuration

In index.html change:

Video ID
```javascript
var video = "tlBbt5niQto"; // Change this to your video ID
```

Update actor credentials
```javascript
// "global" variables read by ADL.XAPIYoutubeStatements
ADL.XAPIYoutubeStatements.changeConfig({
  "actor":  {"mbox":"mailto:anon@example.com", "name":"anonymous"},
  "videoActivity": {"id":"https://www.youtube.com/watch?v=" + video, "definition":{"name": {"en-US":video}} }
});
```
Update xAPIWrapper information
```javascript
// Auth for the LRS
var conf = {
    "endpoint" : "https://lrs.adlnet.gov/xapi/",
    "auth" : "Basic " + toBase64("xapi-tools:xapi-tools"),
};
```

## Use
Host the github project files on your server. Launch index.html.

##Examples
See [xapi-youtube-statements.js](https://github.com/adlnet/xapi-youtube/blob/master/src/xapi-youtube-statements.js) for examples on how to integrate with IFrame.

For more information on how to dispach statements to an LRS, see [our example](http://adlnet.github.io/xapi-youtube)

## Contributing to the project
We welcome contributions to this project. Fork this repository, make changes, and submit pull requests. If you're not comfortable with editing the code, please [submit an issue](https://github.com/adlnet/xapi-youtube/issues) and we'll be happy to address it. 

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
