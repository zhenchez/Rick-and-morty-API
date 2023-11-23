const pattern = /150\/(.+)$/;

function updateCharacterCardColors(colors) {
  const character = document.querySelectorAll(".character");
  character.forEach((card, index) => {
    let randN = Math.floor(Math.random() * 5000);
    let matchColor = colors[randN].thumbnailUrl.match(pattern);
    let style = document.createElement("style");
    style.textContent = `
      .color-bg-${index} {
        border: 2px solid #${matchColor[1]};
      }
    `;
    document.head.appendChild(style);
    card.classList.add(`color-bg-${index}`);
  });
}

export function fetchColors() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(data => {
      updateCharacterCardColors(data);
    })
    .catch(error => {
      console.error("Error fetching colors:", error);
    });
}
