(function(ADL){

  XAPIVideoStatements = function() {

    var actor = {};
    var object = {};
    var context = {};

    this.changeConfig = function(myXAPI) {
      actor = myXAPI.actor;
      object = myXAPI.object;
      context = myXAPI.context;
    }

    this.buildStatement = function(stmt) {
      if (stmt) {
        stmt.actor = actor;
        stmt.object = object;
        stmt.context = context;
      }
    }

    this.sendStatement = function(stmt) {
      if (stmt) {
        this.buildStatement(stmt);
        ADL.XAPIWrapper.sendStatement(stmt);
        console.log(stmt);
      }
    }

    this.initializeVideo = function(stmt) {
      stmt.verb = {
        id: ADL.videoprofile.references.initialized['@id'],
        display: {"en-US": "initialized"}
      };
    }

    this.playVideo = function(stmt, ISOTime) {
      stmt.verb = {
        id: ADL.videoprofile.verbs.played['@id'],
        display: ADL.videoprofile.verbs.played.prefLabel
      };
      stmt.result = {"extensions":{"resultExt:resumed":ISOTime}};
    }

    this.pauseVideo = function(stmt, ISOTime) {
      stmt.verb = {
        id: ADL.videoprofile.verbs.paused['@id'],
        display: ADL.videoprofile.verbs.paused.prefLabel
      };
      stmt.result = {"extensions":{"resultExt:paused":ISOTime}};
    }

    this.seekVideo = function(stmt, ISOTime) {
      stmt.verb = {
        id: ADL.videoprofile.verbs.seeked['@id'],
        display: ADL.videoprofile.verbs.seeked.prefLabel
      }
      stmt.result = {"extensions":{"resultExt:seeked":ISOTime}};
    }

    this.completeVideo = function(stmt, ISOTime) {
      stmt.verb = {
        id: ADL.videoprofile.references.completed['@id'],
        display: {"en-US": "completed"}
      }
      stmt.result = {"duration":ISOTime, "completion": true};
    }

    this.terminateVideo = function(stmt) {
      stmt.verb = {
        id: ADL.videoprofile.references.terminated['@id'],
        display: { "en-US": "terminated" }
      };
    }

    this.abandonVideo = function(stmt) {
      stmt.verb = {
        id: ADL.videoprofile.references.abandoned['@id'],
        display: { "en-US": "abandoned" }
      };
    }

  }

  ADL.XAPIVideoStatements = new XAPIVideoStatements();

}(window.ADL = window.ADL || {}));
