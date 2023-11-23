import { fetchColors } from "./colors.js";

export function cleanSelect() {
  document.querySelector(".select").classList.add("invisible");
}

export function generateLocationsHTML(items) {
  const mainSelect = document.querySelector(".select");
  mainSelect.classList.remove("invisible");
  const grid = document.querySelector(".grid");
  let mainHTML = `
    <select name="location" class="location-select" id="location value="earth (c-137)""> 
    </select>
  `;
  mainSelect.innerHTML = mainHTML;

  const select = document.querySelector(".location-select");
  items.results.forEach(location => {
    let option = document.createElement("option");
    option.value = location.name;
    option.text = location.name;
    select.appendChild(option);
  });
}

export function fetchLocations(type) {
  fetch(`https://rickandmortyapi.com/api/location/${type}`)
    .then(response => response.json())
    .then(data => {
      generateLocationsHTML(data);
      generateCharacterHTML(data);
      addEventListenerSelect(data);
      fetchColors();
    })
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}

function addEventListenerSelect(items) {
  document.querySelector(".location-select").addEventListener("change", () => {
    generateCharacterHTML(items);
  });
}

function generateCharacterHTML(items) {
  const grid = document.querySelector(".grid");
  const select = document.querySelector(".location-select").value.toLowerCase();
  grid.innerHTML = "";
  items.results.forEach(item => {
    if (item.name.toLowerCase() === select) {
      if (item.residents.length === 0) {
        grid.innerHTML = '<h1 class="no-residents">No redisents...</h1>';
      }
      let bodyHTML = "";
      item.residents.forEach(char => {
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
