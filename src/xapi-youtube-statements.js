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
      }

      this.onPlayerReady = function(event) {
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

      function buildStatement(stmt) {
        var stmt = stmt;
        stmt.actor = actor;
        stmt.object = videoActivity;
        return stmt;
      }

      var makeNum = function(time) { return Number(time.slice(2, -1)); }

      // Referencing http://xapi.vocab.pub/datasets/video/
      function playVideo(ISOTime) {
        var stmt = {};
        /*if (competency) {
          stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
        }*/

        if (makeNum(ISOTime) === 0) {
            stmt.verb = ADL.verbs.initialized;
        } else {
          stmt.verb = {
              id: ADL.videoprofile.verbs.played['@id'],
              display: ADL.videoprofile.verbs.played.prefLabel
          };
          stmt.result = {"extensions":{"resultExt:resumed":ISOTime}};
        }
        return buildStatement(stmt);
      }

      function pauseVideo(ISOTime) {
        var stmt = {};

        stmt.verb = {
            id: ADL.videoprofile.verbs.paused['@id'],
            display: ADL.videoprofile.verbs.paused.prefLabel
        };
        // stmt.verb = ADL.verbs.suspended;
        stmt.result = {"extensions":{"resultExt:paused":ISOTime}};

        /*if (competency) {
            stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
        }*/
        return buildStatement(stmt);
      }

      function completeVideo(ISOTime) {
        var stmt = {};

        stmt.verb = ADL.verbs.completed;
        stmt.result = {"duration":ISOTime, "completion": true};

        /*if (competency) {
            stmt["context"] = {"contextActivities":{"other" : [{"id": "compID:" + competency}]}};
        }*/
        return buildStatement(stmt);
      }

    }

    ADL.XAPIYoutubeStatements = new XAPIYoutubeStatements();

    ADL.XAPIYoutubeStatements.onPlayerReadyCallback = function(message) {};
    ADL.XAPIYoutubeStatements.onStateChangeCallback = function(stmt) {};

}(window.ADL = window.ADL || {}));
