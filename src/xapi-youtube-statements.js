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

      this.onPlayerReady = function(event) {
        //event.target.playVideo();
        var message = "yt: player ready";
        log(message);
        ADL.XAPIYoutubeStatements.onPlayerReadyCallback(message);
      }

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
        ADL.XAPIYoutubeStatements.onStateChangeCallback(e, stmt);
      }

      function playVideo(ISOTime) {
        var stmt = {"actor":actor, "object": videoActivity};
        /*if (competency) {
          stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
        }*/

        if (ISOTime == "PT0S") {
          stmt["verb"] = ADL.verbs.launched;
        } else {
          stmt["verb"] = ADL.verbs.resumed;
          stmt["result"] = {"extensions":{"resultExt:resumed":ISOTime}};
        }
        return stmt;
      }

      function pauseVideo(ISOTime) {
          var stmt = {"actor":actor, 
                  "verb":ADL.verbs.suspended,
                  "object":videoActivity, 
                  "result":{"extensions":{"resultExt:paused":ISOTime}}};

          /*if (competency) {
              stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
          }*/
          return stmt;
      }

      function completeVideo(ISOTime) {
          var stmt = {"actor":actor, 
                  "verb":ADL.verbs.completed, 
                  "object":videoActivity, 
                  "result":{"duration":ISOTime, "completion": true}};

          /*if (competency) {
              stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
          }*/
          return stmt;
      }

    }

    ADL.XAPIYoutubeStatements = new XAPIYoutubeStatements();

    ADL.XAPIYoutubeStatements.onPlayerReadyCallback = function(message) {};
    ADL.XAPIYoutubeStatements.onStateChangeCallback = function(stmt) {};

}(window.ADL = window.ADL || {}));
