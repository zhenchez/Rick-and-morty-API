import { fetchColors } from "./colors.js";

export function generateCharacterHTML(items) {
  const grid = document.querySelector(".grid");
  let allHTML = "";
  items.results.forEach(item => {
    let bodyHTML = "";
    bodyHTML += `
    <div class="character">
      <div class="character-thumbnail">
        <img class="character-img" src="${item.image}" />
      </div>

      <div class="character-details">
        <p class="character-name max-lines" title="${item.name}">${item.name} (${item.species})</p>

        <p class="character-origin max-lines" title="${item.origin.name}">Origin: ${item.origin.name}</p>
        <p class="character-status" title="${item.status}">Status: ${item.status}</p>
      </div>
    </div>
    `;
    allHTML += bodyHTML;
  });
  grid.innerHTML = allHTML;
}

export function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      generateCharacterHTML(data);
      fetchColors();
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}
