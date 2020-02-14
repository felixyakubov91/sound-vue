import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

//FELIX TODO: add function if browser is old
if (!SpeechRecognition) {
}

const recognition = new SpeechRecognition();

recognition.lang = "en-US"; //culture!!!
recognition.interimResults = false;
recognition.maxAlternatives = 1;

export default new Vuex.Store({
  state: {
    counter: 0,
    intent: "None",
    intensity: "None",
    score: 0,
    uiState: "idle",
    zoom: 3
  },
  getters: {
    intentStr: state => {
      var str = state.intent;
      str = str.replace(/\b(App.)\b/gi, "");
      return str;
    },
    intensityStr: state => {
      var str = state.intensity;
      str = str.replace(/\b(Intensity.)\b/gi, "");
      return str;
    }
  },
  mutations: {
    newIntent: (state, { intent, score }) => {
      if (intent.includes("Intensity")) {
        state.intensity = intent;
        if (intent.includes("More")) {
          state.counter++;
        } else if (intent.includes("Less")) {
          state.counter--;
        }
      } else {
        state.intent = intent;
      }
      state.score = score;
    },
    setUiState: (state, status) => {
      state.uiState = status;
    },
    setIntent: (state, status) => {
      state.intent = status;
    },
    stopRecording: state => {
      recognition.abort();
      state.uiState = "idle";
    },
    setZoom: state => {
      var expr = state.intent;
      switch (expr) {
        case "App.Excited":
          state.zoom = 2 + state.counter;
          break;
        case "App.Nervous":
          state.zoom = 2 + state.counter;
          break;
        case "App.Happy":
          state.zoom = 2 + state.counter;
          break;
        case "App.Calm":
          state.zoom = 1 + state.counter;
          break;
        default:
          state.zoom = 3 + state.counter;
      }
    }
  },
  actions: {
    getSpeech({ dispatch, commit, state }) {
      commit("setUiState", "listening");

      state.intent === "None"
        ? (recognition.continuous = true)
        : (recognition.continuous = false);

      recognition.start();

      recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const phrase = event.results[last][0].transcript;
        dispatch("getUnderstanding", phrase);
      };
    },

    getUnderstanding({ commit }, utterance) {
      commit("setUiState", "fetching");
      const url = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/72c2a14b-5262-4908-99f5-07ef4a37a5e6`;

      https: axios({
        method: "get",
        url,
        params: {
          verbose: true,
          timezoneOffset: 0,
          q: utterance
        },
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "7398f03489d44910ad9fa2c09850f0a5"
        }
      })
        .then(({ data }) => {
          console.log("axios result", data);
          if (altMaps.hasOwnProperty(data.query)) {
            commit("newIntent", {
              intent: altMaps[data.query],
              score: 1
            });
          } else {
            commit("newIntent", data.topScoringIntent);
          }
          commit("setUiState", "idle");
          commit("setZoom");
        })
        .catch(err => {
          console.error("axios error", err);
        });
    }
  }
});

//FELIX TODO: add list of words that are broken or simillar
const altMaps = {
  angy: "App.Nervous",
  call: "App.Calm",
  les: "Intensity.Less",
  mor: "Intensity.More",
  plus: "Intensity.Less"
};
