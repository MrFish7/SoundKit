document.addEventListener('DOMContentLoaded', appStart);
const sounds = {
    KeyA: "boom",
    KeyS: "clap",
    KeyD: "hihat",
    KeyF: "kick",
    KeyG: "openhat",
    KeyH: "ride",
    KeyJ: "snare",
    KeyK: "tink",
    KeyL: "tom"
}

let isRecording = false
let recStart = 0

function appStart() {
    window.addEventListener('keypress', playSound)
    document.querySelector('#rec').addEventListener('click', recAudio)
    document.querySelector('#play').addEventListener('click', playAudio)
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
}

function endSound(e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!key)
        return;
    key.classList.remove('playing');
}

window.addEventListener('keydown', playSound)
window.addEventListener('keyup', endSound);
