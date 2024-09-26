// Initialize variables
const synth = window.speechSynthesis;
let utterance;
let voices = [];

// Function to populate the voice list
function populateVoiceList() {
    voices = synth.getVoices().filter(voice => voice.lang.startsWith('en-US'));
    const voiceSelect = document.querySelector("#voices");
    voiceSelect.innerHTML = "";
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.textContent = voice.name;
        option.setAttribute("data-index", i);
        voiceSelect.appendChild(option);
    });
}

// Function to reset the text input
function resetTextInput() {
    document.getElementById("text-input").value = "";
    if (utterance) {
        synth.cancel();
    }
}

// Function to play the speech
function playSpeech() {
    utterance = new SpeechSynthesisUtterance(document.getElementById("text-input").value);
    const selectedVoiceIndex = document.querySelector("#voices").selectedIndex;
    utterance.voice = voices[selectedVoiceIndex];
    synth.speak(utterance);
}

// Event listeners and voiceschanged event
document.getElementById("play").addEventListener("click", playSpeech);
document.getElementById("pause").addEventListener("click", () => synth.pause());
document.getElementById("stop").addEventListener("click", () => synth.cancel());
document.getElementById("reset").addEventListener("click", resetTextInput);

synth.onvoiceschanged = populateVoiceList;
populateVoiceList(); // Populate voice list when page loads
