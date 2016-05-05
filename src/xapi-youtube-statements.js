(function(ADL){
    
    var debug = true;
    var log = function(message)
    {
      if (!debug) return false;
      try
      {
        console.log(message);
        return true;
      }
      catch(e) { return false; }
    }

    XAPIYoutubeStatements = function() {

      var actor = {"mbox":"mailto:anon@example.com", "name":"anonymous"};
      var videoActivity = {};
      
      this.changeConfig = function(options) {
        actor = options.actor;
        videoActivity = options.videoActivity;
      };

      this.onPlayerReady = function(event) {
        var message = "yt: player ready";
        log(message);
        ADL.XAPIYoutubeStatements.onPlayerReadyCallback(message);
      };

      this.onStateChange = function(event) {
        var curTime = player.getCurrentTime().toString();
        var ISOTime = "PT" + curTime.slice(0, curTime.indexOf(".")+3) + "S";
        var stmt = null;
        var e = "";
        switch(event.data) {
          case -1:
            e = "unstarted";
            log("yt: " + e);
            break;
          case 0:
            e = "ended";
            log("yt: " + e);
            stmt = completeVideo(ISOTime);
            break;
          case 1:
            e = "playing";
            log("yt: " + e);
            stmt = playVideo(ISOTime);
            break;
          case 2:
            e = "paused";
            log("yt: " + e);
            stmt = pauseVideo(ISOTime);
            break;
          case 3:
            e = "buffering";
            log("yt: " + e);
            break;
          case 5:
            e = "cued";
            log("yt: " + e);
            break;
          default:
        }
        playerPreviousState = event.data;
        ADL.XAPIYoutubeStatements.onStateChangeCallback(e, stmt);
        playerPreviousTime = ISOTime;
      };
      function buildStatement(stmt) {
        var stmt = stmt;
        stmt.actor = actor;
        stmt.object = videoActivity;
        return stmt;
      }

      function playVideo(ISOTime) {
            var stmt = {
                "verb": { "id": "http://activitystrea.ms/schema/1.0/play", "display": { "en-US": "played" } },
                "context": {
                    "contextActivities": {"category": {"id":"http://id.tincanapi.com/recipe/video/base/1"}},
                    "extensions": { "http://id.tincanapi.com/extension/starting-point": ISOTime }
                }
            };
            return buildStatement(stmt);
        }

       function pauseVideo(ISOTime) {
            var stmt = {
                "verb": " ",
                "context": {
                    "contextActivities": {
                        "category": { "id": "http://id.tincanapi.com/recipe/video/base/1" }
                    },
                    "extensions": " "
                }
            };
            
            if (playerPreviousState == 2 || playerPreviousState == 5) {
                stmt.verb = { "id": "http://id.tincanapi.com/verb/skipped", "display": { "en-US": "skipped" } };
                stmt.context.extensions = {
                    "http://id.tincanapi.com/extension/starting-point": playerPreviousTime,
                    "http://id.tincanapi.com/extension/ending-point": ISOTime
                };

            } else {
                stmt.verb = { "id": "http://id.tincanapi.com/verb/paused", "display": { "en-US": "paused" } };
                stmt.context.extensions = { "http://id.tincanapi.com/extension/ending-point": ISOTime };
            }
            
            return buildStatement(stmt);
        }

      function completeVideo(ISOTime) {
            var stmt = {
                "verb": { "id": "http://activitystrea.ms/schema/1.0/complete", "display": {"en-US": "completed"} },
                "result": {"duration":ISOTime, "completion": true},
                "context": {
                    "contextActivities": { "category": { "id": "http://id.tincanapi.com/recipe/video/base/1" } },
                    "extensions": { "http://id.tincanapi.com/extension/ending-point": ISOTime }
                }
            };
            return buildStatement(stmt);
        }
    }

    ADL.XAPIYoutubeStatements = new XAPIYoutubeStatements();

    ADL.XAPIYoutubeStatements.onPlayerReadyCallback = function(message) {};
    ADL.XAPIYoutubeStatements.onStateChangeCallback = function(stmt) {};

}(window.ADL = window.ADL || {}));
