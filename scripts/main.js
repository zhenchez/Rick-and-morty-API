import { fetchCharacters } from "./characters.js";
import { fetchLocations } from "./locations.js";
import { fetchEpisodes } from "./episodes.js";
import { cleanMainHome, generateHomeHTML, cleanGrid } from "./home.js";
import {
  pageHandlerHTML,
  cleanPageHandler,
  addEventPageHandler,
  hidePageHandler,
} from "./page-handler.js";
import { fetchColors } from "./colors.js";
import { addSearchBar } from "./search.js";

function toTop() {
  document.querySelector(".to-top-btt").addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}

function home() {
  document.querySelector("#home").addEventListener("click", () => {
    cleanGrid();
    cleanPageHandler();
    generateHomeHTML();
  });
}
function characters() {
  document.querySelector("#characters").addEventListener("click", () => {
    cleanMainHome();
    fetchCharacters(1);
    fetchColors();
    pageHandlerHTML();
    addEventPageHandler("character");
  });
}
function locations() {
  document.querySelector("#locations").addEventListener("click", () => {
    cleanMainHome();
    fetchLocations(1);
    fetchColors();
    pageHandlerHTML();
    addEventPageHandler("location");
  });
}
function episodes() {
  document.querySelector("#episodes").addEventListener("click", () => {
    cleanMainHome();
    fetchEpisodes(1);
    fetchColors();
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
