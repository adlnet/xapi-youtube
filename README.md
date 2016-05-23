# xapi-youtube
Send Youtube Video interactions to an LRS with xAPI

This script uses [YouTube's iframe API](https://developers.google.com/youtube/iframe_api_reference) to build statements with xapi-youtube-statements.js when events are fired.

These statements can be dispatched to an LRS with xapiwrapper.min.js using a custom ADL.XAPIYoutubeStatements.onStateChangeCallback function.

Check out http://adlnet.github.io/xapi-youtube for a live demo.

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
