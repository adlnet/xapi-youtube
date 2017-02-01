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

    XAPIHTMLStatements = function() {

      var ISOTime;
      var started = false;
      var completed = false;

      this.onPlayerReady = function() {
        var message = "html: player ready";
        log(message);

        // Add listeners to the player's events
        player.onplay = playVideo;
        player.onpause = pauseVideo;
        player.onseeked = seekVideo;
        player.onended = completeVideo;
        window.onunload = exitVideo;
      }

      this.onStateChange = function() {
        var time = player.currentTime.toString();
        ISOTime = "PT" + time.slice(0, time.indexOf(".")+3) + "S";
      }

      function initializeVideo() {
        var stmt = {};
        log("html: initialized");
        started = true;
        ADL.XAPIVideoStatements.initializeVideo(stmt);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function playVideo() {
        if (!started) {
          initializeVideo();
        }

        var stmt = {};
        log("html: played");
        ADL.XAPIVideoStatements.playVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function pauseVideo() {
        var stmt = {};
        log("html: paused");
        ADL.XAPIVideoStatements.pauseVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function seekVideo() {
        var stmt = {};
        log("html: seeked");
        ADL.XAPIVideoStatements.seekVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function completeVideo() {
        if (completed) {
          return;
        }

        var stmt = {};
        log("html: completed");
        completed = true;
        ADL.XAPIVideoStatements.completeVideo(stmt, ISOTime);
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

      function exitVideo() {
        if (!started) {
          return;
        }

        var stmt = {};
        // 'terminated' statement for completed video
        if (completed) {
          log("html: terminated");
          ADL.XAPIVideoStatements.terminateVideo(stmt);
          // 'abandoned' statement for incomplete video
        } else {
          log("html: abandoned");
          ADL.XAPIVideoStatements.abandonVideo(stmt);
        }

        // send statement immediately to avoid event delay
        ADL.XAPIVideoStatements.sendStatement(stmt);
      }

    }

    ADL.XAPIHTMLStatements = new XAPIHTMLStatements();

}(window.ADL = window.ADL || {}));
