import { generateCharacterHTML } from "./characters.js";
import { generateLocationsHTML } from "./locations.js";
import { generateEpisodesHTML } from "./episodes.js";
import { fetchColors } from "./colors.js";
import { cleanMainHome, cleanGrid } from "./home.js";
import { pageHandlerHTML, addEventPageHandler } from "./page-handler.js";

export function addSearchBar() {
  const searchBarData = document
    .querySelector(".searchbar")
    .value.toLowerCase();

  document.querySelector(".searchbar").addEventListener("keyup", () => {
    fetch(`https://rickandmortyapi.com/api/character/?name=rick`)
      .then(response => response.json())
      .then(data => {
        const totalPages = data.info.pages;
        cleanMainHome();
        cleanGrid();
        generateCharacterHTML(data);
        fetchColors();
      })
      .catch(error => {
        console.error("Error fetching characters:", error);
      });
  });
}
