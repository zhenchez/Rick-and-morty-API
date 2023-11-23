import { fetchColors } from "./colors.js";

export function generateEpisodesHTML(items) {
  const mainSelect = document.querySelector(".select");
  mainSelect.classList.remove("invisible");
  const grid = document.querySelector(".grid");
  let mainHTML = `
    <select name="location" class="ep-select" id="location value="earth (c-137)""> 
    </select>
  `;
  mainSelect.innerHTML = mainHTML;

  const select = document.querySelector(".ep-select");
  items.results.forEach(location => {
    let option = document.createElement("option");
    option.value = location.name;
    option.text = location.name + " -  " + location.episode;
    select.appendChild(option);
  });
}

export function fetchEpisodes(type) {
  fetch(`https://rickandmortyapi.com/api/episode/${type}`)
    .then(response => response.json())
    .then(data => {
      generateEpisodesHTML(data);
      generateCharacterHTML(data);
      addEventListenerSelect(data);
      fetchColors();
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}

function addEventListenerSelect(items) {
  document.querySelector(".ep-select").addEventListener("change", () => {
    generateCharacterHTML(items);
  });
}

function generateCharacterHTML(items) {
  const grid = document.querySelector(".grid");
  const select = document.querySelector(".ep-select").value.toLowerCase();
  grid.innerHTML = "";
  items.results.forEach(item => {
    if (item.name.toLowerCase() === select) {
      let bodyHTML = "";
      item.characters.forEach(char => {
        let allHTML = "";
        fetch(`${char}`)
          .then(response => response.json())
          .then(data => {
            let color =
              data.status === "Alive"
                ? "dot-green"
                : data.status === "Dead"
                ? "dot-red"
                : "dot-gray";
            bodyHTML += `
                <div class="character">
                  <div class="character-thumbnail">
                    <img class="character-img" src="${data.image}" />
                  </div>
            
                  <div class="character-details">
                    <p class="character-name max-lines" title="${data.name}">${data.name}</p>
            
                    <p class="character-origin max-lines" title="${data.origin.name}">Origin: ${data.origin.name}</p>
                    <p class="character-status" title="${data.status}"><span class="status-dot"><i class='bx bxs-circle ${color}' ></i></i></span> ${data.status} - ${data.species}</p>
                  </div>
                </div>
            `;
            allHTML += bodyHTML;

            grid.innerHTML = allHTML;
          })
          .catch(error => {
            console.error("Error fetching characters:", error);
          });
      });
      fetchColors();
    }
  });
}
