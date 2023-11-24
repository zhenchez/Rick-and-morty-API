let synth = null;

function speakText(details) {
  synth && window.speechSynthesis.speaking
    ? window.speechSynthesis.cancel()
    : synth;
  const speech = new SpeechSynthesisUtterance();
  speech.text = details;

  speech.lang = "en-US";
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(
    voice => voice.name === "Microsoft Zira - English (United States)"
  );

  if (selectedVoice) {
    speech.voice = selectedVoice;
  }

  window.speechSynthesis.speak(speech);
  synth = speech;
}

export function addEventSpeech() {
  const characterDOM = document.querySelectorAll(".character");
  characterDOM.forEach(char => {
    char.addEventListener("click", () => {
      const details = char.querySelector(".character-details").textContent;
      speakText(details);
    });
  });
}
