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

      var started = false;
      var seeking = false;
      var prevTime = 0.0;
      var completed = false;

      this.onPlayerReady = function(event) {
        var message = "yt: player ready";
        log(message);
        window.onunload = exitVideo;
      }

      this.onStateChange = function(event) {
        var curTime = player.getCurrentTime().toString();
        var ISOTime = "PT" + curTime.slice(0, curTime.indexOf(".")+3) + "S";
        switch(event.data) {
          case -1:
            initializeVideo(ISOTime);
            break;
          case 0:
            completeVideo(ISOTime);
            break;
          case 1:
            playVideo(ISOTime);
            break;
          case 2:
            prevTime = Date.now();
            setTimeout(function() {pauseVideo(ISOTime);}, 100);
            break;
          case 3:
            log("yt: buffering");
            break;
          case 5:
            log("yt: cued");
            break;
          default:
        }
      }

      function initializeVideo(ISOTime) {
        var stmt = {};
        log("yt: initialized");
        ADL.XAPIVideoStatements.initializeVideo(stmt);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function playVideo(ISOTime) {
        // calculate time from paused state
        var elapTime = (Date.now() - prevTime) / 1000.0;

        if (!started || elapTime > 0.2) {
          var stmt = {};
          log("yt: played");
          ADL.XAPIVideoStatements.playVideo(stmt, ISOTime);
          ADL.XAPIVideoStatements.sendStatement(stmt);
          started = true;
        }
        else {
          seeking = true;
          seekVideo(ISOTime);
        }
      }

      function pauseVideo(ISOTime) {
        var stmt = {};

        // check for seeking
        if (!seeking) {
          log("yt: paused");
          ADL.XAPIVideoStatements.pauseVideo(stmt, ISOTime);

          // manually send 'paused' statement because of interval delay
          ADL.XAPIVideoStatements.sendStatement(stmt);
        }
        else {
          seeking = false;
        }
      }

      function seekVideo(ISOTime) {
        var stmt = {};
        log("yt: seeked");
        ADL.XAPIVideoStatements.seekVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function completeVideo(ISOTime) {
        if (completed) {
          return null;
        }

        var stmt = {};
        log("yt: completed");
        ADL.XAPIVideoStatements.completeVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
        completed = true;
      }

      function exitVideo() {
        if (!started) {
          return;
        }

        var stmt = {};
        // 'terminated' statement for completed video
        if (completed) {
          log("yt: terminated");
          ADL.XAPIVideoStatements.terminateVideo(stmt);
          // 'abandoned' statement for incomplete video
        } else {
          log("yt: abandoned");
          ADL.XAPIVideoStatements.abandonVideo(stmt);
        }

        // send statement immediately to avoid event delay
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

    }

    ADL.XAPIYoutubeStatements = new XAPIYoutubeStatements();

    ADL.XAPIYoutubeStatements.onPlayerReadyCallback = function(message) {};
    ADL.XAPIYoutubeStatements.onStateChangeCallback = function(stmt) {};

}(window.ADL = window.ADL || {}));
