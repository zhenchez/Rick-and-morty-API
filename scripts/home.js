export function cleanMainHome() {
  document.querySelector(".main-home").classList.add("invisible");
}
export function cleanGrid() {
  document.querySelector(".grid").innerHTML = "";
}
export function generateHomeHTML() {
  const home = document.querySelector(".main-home");
  home.classList.remove("invisible");
  let bodyHTML = "";
  bodyHTML += `
    <div class="main-home-lside">
      <h1 class="main-home-title">Rick & Morty API</h1>
      <h1 class="main-home-subtitle">
        Search for the character you want...
      </h1>
    </div>
    <div class="main-home-rside">
      <div class="main-home-thumbnail">
        <img src="./img/main-thumbnail.png" class="main-home-img" />
      </div>
    </div>
  `;
  home.innerHTML = bodyHTML;
}
