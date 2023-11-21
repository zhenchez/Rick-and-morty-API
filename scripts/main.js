import { fetchCharacters } from "./characters.js";
import { fetchLocations } from "./locations.js";
import { fetchEpisodes } from "./episodes.js";
import { fetchColors } from "./colors.js";

function toTop() {
  document.querySelector(".to-top-btt").addEventListener("click", () => {
    window.scrollTo({ top: 0 });
  });
}
function characters() {
  document.querySelector("#characters").addEventListener("click", () => {
    fetchCharacters(1);
    fetchColors();
  });
}
function locations() {
  document.querySelector("#locations").addEventListener("click", () => {
    fetchLocations(1);
    fetchColors();
  });
}
function episodes() {
  document.querySelector("#episodes").addEventListener("click", () => {
    fetchEpisodes(1);
    fetchColors();
  });
}

toTop();
characters();
locations();
episodes();
