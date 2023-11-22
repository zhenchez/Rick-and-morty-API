import { fetchCharacters } from "./characters.js";
import { fetchLocations } from "./locations.js";
import { fetchEpisodes } from "./episodes.js";

export function addSearchBar() {
  const searchBarData = document
    .querySelector(".searchbar")
    .value.toLowerCase();

  if (searchBarData.includes("staus")) {
    document.querySelector(".searchbar").addEventListener("keyup", () => {
      fetch(`https://rickandmortyapi.com/api/character/?page=3`)
        .then(response => response.json())
        .then(data => {
          generateCharacterHTML(data);
        })
        .catch(error => {
          console.error("Error fetching characters:", error);
        });
    });
  }
}
