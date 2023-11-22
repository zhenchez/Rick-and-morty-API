import { fetchColors } from "./colors.js";

export function generateEpisodesHTML(items) {
  const grid = document.querySelector(".grid");
  let allHTML = "";
  items.results.forEach(item => {
    let bodyHTML = "";
    bodyHTML += `
    <div class="character">
      <div class="character-details">
        <p class="character-name max-lines" title="${item.name}">${item.name} (${item.episode})</p>

        <p class="character-origin max-lines" title="${item.air_date}">Origin: ${item.air_date}</p>
      </div>
    </div>
    `;
    allHTML += bodyHTML;
  });
  grid.innerHTML = allHTML;
}

export function fetchEpisodes(page) {
  fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      generateEpisodesHTML(data);
      fetchColors();
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}
