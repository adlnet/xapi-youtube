(function (ADL) {

ADL.videoprofile =
{
    "metadata":
    {
      "@context": "http://xapi.vocab.pub/vocabulary/context.jsonld",
      "@id": "https://w3id.org/xapi/video",
      "@type": "ConceptScheme",
      "prefLabel": {
      	"en": "Video Profile Vocabulary"
      },
      "created": {
        "en": "2016-6-09"
      },
      "modified": {
        "en": "2016-9-23"
      },
      "editorialNote": {
        "en": "The video vocabulary of the xAPI was created to identify and standardize common video interactions that can be tracked."
      },
      "wasGeneratedBy": {
        "name": {
          "en": "xAPI Video Community of Practice"
        }
      }
    },
    "activity-types":
    {
        "video":
        {
          "@id": "https://w3id.org/xapi/video/activity-type/video",
          "@type": "ActivityType",
          "definition": {
            "en": "A recording of both the visual and audible components made available on a display screen."
          },
          "prefLabel": {
            "en": "video"
          },
          "closelyRelatedNaturalLanguageTerm": {
            "@id": "http://wordnet-rdf.princeton.edu/wn31/104541422-n"
          }
        }
    },
    "extensions":
    {
        "cc-subtitle-lang":
        {
          "@id": "https://w3id.org/xapi/video/extensions/cc-subtitle-lang",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#language"
          },
          "definition": {
            "en": "Used to express the language of subtitle or closed captioning."
          },
          "prefLabel": {
            "en": "cc-subtitle-lang"
          },
          "scopeNote": {
            "en": "Used only when cc-subtitle-enabled is true. The lexical and value spaces of language are the set of language codes defined by RFC 1766."
          }
        },
        "full-screen":
        {
          "@id": "https://w3id.org/xapi/video/extensions/full-screen",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#boolean"
          },
          "definition": {
            "en": "Used to expresses that the video is played in full screen mode."
          },
          "prefLabel": {
            "en": "full-screen"
          },
          "scopeNote": {
            "en": "Value is boolean true or false."
          }
        },
        "user-agent":
        {
          "@id": "https://w3id.org/xapi/video/extensions/user-agent",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "definition": {
            "en": "Used to identify the User Agent string of the browser, if the video is launched in browser."
          },
          "prefLabel": {
            "en": "user-agent"
          }
        },
        "cc-subtitle-enabled":
        {
          "@id": "https://w3id.org/xapi/video/extensions/cc-subtitle-enabled",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#boolean"
          },
          "definition": {
            "en": "Used to expresses whether subtitle or closed captioning is enabled. "
          },
          "prefLabel": {
            "en": "cc-subtitle-enabled"
          },
          "scopeNote": {
            "en": "Value is boolean as in true or false."
          }
        },
        "time-from":
        {
          "@id": "https://w3id.org/xapi/video/extensions/time-from",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#float"
          },
          "definition": {
            "en": "Used to identify the point in time the actor changed from in a media object (eg: “200.000” in seconds and milliseconds)."
          },
          "prefLabel": {
            "en": "time-from"
          },
          "scopeNote": {
            "en": "Float Value with maximim 3 decimals. Required to be used exclusively with the verb seeked."
          }
        },
        "heat-map":
        {
          "@id": "https://w3id.org/xapi/video/extensions/heat-map",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "definition": {
            "en": "Heat map data showing parts of the video the actor watched during current registration in chronological order (e.g., 0.000[.]12.000[,]14.000[.]21.000[,]18.000[.]30.000)."
          },
          "prefLabel": {
            "en": "heat-map"
          },
          "scopeNote": {
            "en": "String Value. Each part of the video watched is separated with [,]. The 'Time From' and 'Time To' values are separated with [.]. The time values must match the values recorded as time, time-to and time-from in played, paused, seeked statements."
          }
        },
        "progressRange":
        {
          "@id": "https://w3id.org/xapi/video/extensions/progressRange",
          "@type": [
            "Restriction",
            "Datatype"
          ],
          "onDatatype": {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "onProperty": {
            "@id": "https://w3id.org/xapi/video/extensions/progress"
          },
          "withRestrictions": {
            "@list": [
              {
                "@id": "https://w3id.org/xapi/video/extensions/minInclusive"
              },
              {
                "@id": "https://w3id.org/xapi/video/extensions/maxInclusive"
              }
            ]
          }
        },
        "resolution":
        {
          "@id": "https://w3id.org/xapi/video/extensions/resolution",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "definition": {
            "en": "Used to express the video resolution or quality."
          },
          "prefLabel": {
            "en": "resolution"
          },
          "scopeNote": {
            "en": "Integer Value (e.g., 360, 480, 720, 1080, etc.)"
          }
        },
        "time":
        {
          "@id": "https://w3id.org/xapi/video/extensions/time",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#float"
          },
          "definition": {
            "en": "Used to express the time into the video. (e.g., “00000.000” in seconds and milliseconds)."
          },
          "prefLabel": {
            "en": "time"
          },
          "scopeNote": {
            "en": "Float Value with maximim 3 decimals. Sent along with these verbs: Played, Paused, Terminated, Interacted, Completed (Required)."
          }
        },
        "volumeRange":
        {
          "@id": "https://w3id.org/xapi/video/extensions/volumeRange",
          "@type": [
            "Restriction",
            "Datatype"
          ],
          "onDatatype": {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "onProperty": {
            "@id": "https://w3id.org/xapi/video/extensions/volume"
          },
          "withRestrictions": {
            "@list": [
              {
                "@id": "https://w3id.org/xapi/video/extensions/minInclusive"
              },
              {
                "@id": "https://w3id.org/xapi/video/extensions/maxInclusive"
              }
            ]
          }
        },
        "speed":
        {
          "@id": "https://w3id.org/xapi/video/extensions/speed",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "definition": {
            "en": "Used to express the play-back speed (e.g., 1x,2x,0,-1x,-2x)."
          },
          "prefLabel": {
            "en": "speed"
          },
          "scopeNote": {
            "en": "Float Value with an ‘x’ Negative = Rewind Positive = Fast Forward"
          }
        },
        "session-id":
        {
          "@id": "https://w3id.org/xapi/video/extensions/session-id",
          "@type": "Datatype",
          "onDatatype": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "withRestrictions": {
            "@list": [
              {
                "@id": "http://www.w3.org/2001/XMLSchema#pattern"
              },
              "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[8-9a-bA-B][0-9a-fA-F]{3}-[0-9a-fA-F]{12}"
            ]
          },
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "definition": {
            "en": "Used to tell which session the statement is part of. A session starts with the initiated statement and ends with terminated or abandoned statement."
          },
          "prefLabel": {
            "en": "session-id"
          },
          "scopeNote": {
            "en": "Value of session id has to be the UUID statement id of the initiated statement."
          }
        },
        "time-to":
        {
          "@id": "https://w3id.org/xapi/video/extensions/time-to",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#float"
          },
          "definition": {
            "en": "Used to identify the point in time the actor changed to in a media object (eg: “300.000” in seconds and milliseconds)."
          },
          "prefLabel": {
            "en": "time-to"
          },
          "scopeNote": {
            "en": "Float Value with maximim 3 decimals. Required to be used exclusively with the verb seeked."
          }
        },
        "frame-rate":
        {
          "@id": "https://w3id.org/xapi/video/extensions/frame-rate",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#decimal"
          },
          "definition": {
            "en": "Used to express the frame rate or frames per second of a video (or average rate of frames per second in the case of variable frame-rate). Represented as a ratio of time base over frame duration, such as 30000/1001 or as a decimal, such as 29.970."
          },
          "prefLabel": {
            "en": "frame-rate"
          }
        },
        "track":
        {
          "@id": "https://w3id.org/xapi/video/extensions/track",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "definition": {
            "en": "Used to identify the name of the audio track in a media object."
          },
          "prefLabel": {
            "en": "track"
          }
        },
        "minInclusive":
        {
          "@id": "https://w3id.org/xapi/video/extensions/minInclusive",
          "@type": "DatatypeProperty",
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "minInclusive": "0.0"
        },
        "progress":
        {
          "@id": "https://w3id.org/xapi/video/extensions/progress",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "https://w3id.org/xapi/video/extensions/progressRange"
          },
          "definition": {
            "en": "Used to expresses the percentage of media consumed by the actor."
          },
          "prefLabel": {
            "en": "progress"
          },
          "scopeNote": {
            "en": "Value is a decmial between 0.0 and 1.0."
          }
        },
        "screen-size":
        {
          "@id": "https://w3id.org/xapi/video/extensions/screen-size",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#string"
          },
          "definition": {
            "en": "Used to express the device playback screen size or the maximum available screensize for Video playback."
          },
          "prefLabel": {
            "en": "screen-size"
          },
          "scopeNote": {
            "en": "Value WxH in pixels (e.g., 1080x960, 640x480, 800x600)."
          }
        },
        "volume":
        {
          "@id": "https://w3id.org/xapi/video/extensions/volume",
          "@type": "DatatypeProperty",
          "domain": {
            "@id": "https://w3id.org/xapi/ontology#Extension"
          },
          "range": {
            "@id": "https://w3id.org/xapi/video/extensions/volumeRange"
          },
          "definition": {
            "en": "Used to identify the loudness of sound specified for a media object."
          },
          "prefLabel": {
            "en": "volume"
          },
          "scopeNote": {
            "en": "Volume Level (0 to 1). Float Value. Minimum 0 = Mute. Maximum 1 = 100% Volume"
          }
        },
        "maxInclusive":
        {
          "@id": "https://w3id.org/xapi/video/extensions/maxInclusive",
          "@type": "DatatypeProperty",
          "range": {
            "@id": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "maxInclusive": "1.0"
        }
    },
    "verbs":
    {
        "paused":
        {
          "@id": "https://w3id.org/xapi/video/verbs/paused",
          "@type": "Verb",
          "closeMatch": {
            "@id": "http://id.tincanapi.com/verb/paused"
          },
          "definition": {
            "en": "Indicates the actor paused the video being played at a specific point."
          },
          "prefLabel": {
            "en": "paused"
          },
          "scopeNote": {
            "en": "Indicates that the actor temporary or permanently stop experiencing the recorded media object. A paused statement must be sent before a terminated or abandoned statement if not already sent."
          },
          "closelyRelatedNaturalLanguageTerm": {
            "@id": "http://wordnet-rdf.princeton.edu/wn31/202647119-v"
          }
        },
        "played":
        {
          "@id": "https://w3id.org/xapi/video/verbs/played",
          "@type": "Verb",
          "closeMatch": {
            "@id": "http://activitystrea.ms/schema/1.0/play"
          },
          "definition": {
            "en": "Indicates that the actor started experiencing the recorded media object."
          },
          "prefLabel": {
            "en": "played"
          },
          "scopeNote": {
            "en": "Used when the actor generally played a video or clicked the play button."
          },
          "closelyRelatedNaturalLanguageTerm": {
            "@id": "http://wordnet-rdf.princeton.edu/wn31/201721028-v"
          }
        },
        "seeked":
        {
          "@id": "https://w3id.org/xapi/video/verbs/seeked",
          "@type": "Verb",
          "definition": {
            "en": "Indicates the actor changed the progress towards a specific point."
          },
          "prefLabel": {
            "en": "seeked"
          },
          "scopeNote": {
            "en": "Used in combination with time-from and time-to extensions when the Actor moves the progress bar foward or backward to a specific time in the video."
          },
          "closelyRelatedNaturalLanguageTerm": {
            "@id": "http://wordnet-rdf.princeton.edu/wn31/201843112-v"
          }
        }
    },
    "references":
    {
        "abandoned":
        {
          "@id": "https://w3id.org/xapi/adl/verbs/abandoned",
          "scopeNote": {
            "en": "User to express that the activity provider was able to determine that the session was terminated, however,a terminated statement was not received due to a failure. Any statement after this in the current video session is ignored."
          }
        },
        "completed":
        {
          "@id": "http://adlnet.gov/expapi/verbs/completed",
          "@type": "Verb",
          "scopeNote": {
            "en": "Used to express that the actor completed a video by watching all parts of the video at least once."
          }
        },
        "initialized":
        {
          "@id": "http://adlnet.gov/expapi/verbs/initialized",
          "@type": "Verb",
          "scopeNote": {
            "en": "This is usually the first statement in the video session."
          }
        },
        "interacted":
        {
          "@id": "http://adlnet.gov/expapi/verbs/interacted",
          "@type": "Verb",
          "scopeNote": {
            "en": "Used to express that the actor interacted with the player (except play, pause, seek). e.g. mute, unmute, change resolution, change player size, etc"
          }
        },
        "terminated":
        {
          "@id": "http://adlnet.gov/expapi/verbs/terminated",
          "scopeNote": {
            "en": "Used to express that the actor ended a video. Any statements after this in the current video session is ignored."
          }
        }
    }
};

}(window.ADL = window.ADL || {}));
