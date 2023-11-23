import { fetchCharacters } from "./characters.js";
import { fetchLocations, cleanSelect } from "./locations.js";
import { fetchEpisodes } from "./episodes.js";
import { cleanMainHome, generateHomeHTML, cleanGrid } from "./home.js";
import {
  pageHandlerHTML,
  cleanPageHandler,
  addEventPageHandler,
  hidePageHandler,
} from "./page-handler.js";
import { addSearchBar } from "./search.js";
import { speakText } from "./speakText.js";

function toTop() {
  document.querySelector(".to-top-btt").addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}

function home() {
  document.querySelector("#home").addEventListener("click", () => {
    cleanGrid();
    cleanPageHandler();
    cleanSelect();
    generateHomeHTML();
  });
}
export function characters() {
  document.querySelector("#characters").addEventListener("click", () => {
    cleanMainHome();
    cleanSelect();
    fetchCharacters("character/?", 1);
    pageHandlerHTML();
    addEventPageHandler("character/?");
  });
}
function locations() {
  document.querySelector("#locations").addEventListener("click", () => {
    cleanMainHome();
    fetchLocations("?page=1");
    pageHandlerHTML();
    addEventPageHandler("location");
  });
}
function episodes() {
  document.querySelector("#episodes").addEventListener("click", () => {
    cleanMainHome();
    fetchEpisodes("?page=1");
    pageHandlerHTML();
    addEventPageHandler("episode");
  });
}

generateHomeHTML();
toTop();
home();
characters();
locations();
episodes();
hidePageHandler();
addSearchBar();
speakText();
