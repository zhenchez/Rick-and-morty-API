export function speakText() {
  document.querySelector(".character").addEventListener("click", () => {
    let characters = document.querySelectorAll(".character-details");
    characters.forEach(char => {
      console.log(text);
      let msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
    });
  });
}
