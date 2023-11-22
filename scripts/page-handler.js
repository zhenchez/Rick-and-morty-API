import { fetchCharacters } from "./characters.js";
import { fetchLocations } from "./locations.js";
import { fetchEpisodes } from "./episodes.js";
import { fetchColors } from "./colors.js";

export function cleanPageHandler() {
  document.querySelector(".page-handler").classList.add("invisible");
}

export function pageHandlerHTML() {
  let pageHandlerDOM = document.querySelector(".page-handler");
  pageHandlerDOM.classList.remove("invisible");

  let handlerHTML = "";
  handlerHTML = `
    <div class="page-handler-btt">
      <button class="btt back-first-btt">
        <i class="bx bxs-chevrons-left"></i>
      </button>
      <button class="btt back-btt">
        <i class="bx bxs-chevron-left"></i>
      </button>
      <span class="page-number">1</span>
      <button class="btt next-btt">
        <i class="bx bxs-chevron-right"></i>
      </button>
      <button class="btt next-last-btt">
        <i class="bx bxs-chevrons-right"></i>
      </button>
    </div>
  `;
  pageHandlerDOM.innerHTML = handlerHTML;
}

function fetchData(type) {
  return fetch(`https://rickandmortyapi.com/api/${type}`)
    .then(response => response.json())
    .catch(error => {
      console.error("Error fetching characters:", error);
    });
}

function decideWhatFetch(type, currentIndex, maxPages) {
  if (type === "character") {
    if (currentIndex >= 1 && currentIndex <= maxPages) {
      fetchCharacters(currentIndex);
      fetchColors();
    }
  } else if (type === "location") {
    if (currentIndex >= 1 && currentIndex <= maxPages) {
      fetchLocations(currentIndex);
      fetchColors();
    }
  } else {
    if (currentIndex >= 1 && currentIndex <= maxPages) {
      fetchEpisodes(currentIndex);
      fetchColors();
    }
  }

  document.querySelector(".page-number").innerHTML = currentIndex;
}

export function addEventPageHandler(type) {
  const backFirst = document.querySelector(".back-first-btt");
  const back = document.querySelector(".back-btt");
  const next = document.querySelector(".next-btt");
  const nextLast = document.querySelector(".next-last-btt");
  fetchData(type)
    .then(data => {
      let currentIndex = 1;
      const maxPages = data.info.pages;

      backFirst.addEventListener("click", () => {
        currentIndex = 1;
        decideWhatFetch(type, currentIndex, maxPages);
      });
      back.addEventListener("click", () => {
        currentIndex > 1 ? currentIndex-- : currentIndex;
        decideWhatFetch(type, currentIndex, maxPages);
      });
      next.addEventListener("click", () => {
        currentIndex < maxPages ? currentIndex++ : currentIndex;
        decideWhatFetch(type, currentIndex, maxPages);
      });
      nextLast.addEventListener("click", () => {
        currentIndex = maxPages;
        decideWhatFetch(type, currentIndex, maxPages);
      });
    })
    .catch(error => {
      console.error("Error handling fetched data:", error);
    });
}

export function hidePageHandler() {
  const pageHandlerDOM = document.querySelector(".page-handler");
  let hoverTime;

  pageHandlerDOM.addEventListener("mouseover", () => {
    clearTimeout(hoverTime);
    pageHandlerDOM.style.opacity = "1";
  });
  pageHandlerDOM.addEventListener("mouseout", () => {
    hoverTime = setTimeout(() => {
      pageHandlerDOM.style.opacity = ".3";
    }, 100);
  });
}
