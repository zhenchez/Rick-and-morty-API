import { generateCharacterHTML } from "./characters.js";
import { cleanSelect } from "./locations.js";
import { fetchColors } from "./colors.js";
import { cleanMainHome, cleanGrid } from "./home.js";
import { pageHandlerHTML, addEventPageHandler } from "./page-handler.js";
import { addEventSpeech } from "./speakText.js";

export function addSearchBar() {
  document.querySelector(".searchbar").addEventListener("keyup", () => {
    cleanSelect();
    const searchBarData = document
      .querySelector(".searchbar")
      .value.toLowerCase();
    fetch(`https://rickandmortyapi.com/api/character/?name=${searchBarData}`)
      .then(response => response.json())
      .then(data => {
        cleanMainHome();
        cleanGrid();
        pageHandlerHTML();
        addEventPageHandler(`character/?name=${searchBarData}&`);
        generateCharacterHTML(data);
        addEventSpeech();
        fetchColors();
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
      });
  });
}
