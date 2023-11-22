import { fetchColors } from "./colors.js";

export function generateLocationsHTML(items) {
  const grid = document.querySelector(".grid");
  let allHTML = "";
  items.results.forEach(item => {
    let bodyHTML = "";
    bodyHTML += `
    <div class="character">
      <div class="character-details">
        <p class="character-name max-lines" title="${item.name}">${item.name} (${item.type})</p>

        <p class="character-origin max-lines" title="${item.dimension}">Origin: ${item.dimension}</p>
      </div>
    </div>
    `;
    allHTML += bodyHTML;
  });
  grid.innerHTML = allHTML;
}

export function fetchLocations(page) {
  fetch(`https://rickandmortyapi.com/api/location/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      generateLocationsHTML(data);
      fetchColors();
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}
