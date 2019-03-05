document.addEventListener('DOMContentLoaded', loadAudio);
// lista dźwięków przypisana do każdego klawisza
let sounds = {
    a: "boom",
    s: "clap",
    d: "hihat",
    f: "kick",
    g: "openhat",
    h: "ride",
    j: "snare",
    k: "tink",
    l: "tom"
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("click", clickHandler);

let sciezka = [[]],
    record = [],
    time = [],
    sound = [];

//Wczytywanie dźwięków
function loadAudio() {
    Object.values(sounds).forEach((e) => sound[e] = new Audio('./sounds/' + e + '.wav'));
}

//Funkcja uruchamiana po naciśnięciu klawisza
function keyDown(e) {
    if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.add('key-pressed')
        playKey(e);
    }
}

//Funkcja uruchamiana po puszczeniu klawisza
function keyUp(e) {
    if (document.getElementById(e.key)) {
        document.getElementById(e.key).classList.remove('key-pressed')
    }
}

//Funkcja uruchamiana po naciśnieciu przycisku myszy
function mouseDown(e) {
    if (Object.keys(sounds).indexOf(e.target.id) > -1) {
        e.target.classList.add('key-pressed')
    }
}

//Funkcja uruchamiana po puszczeniu przycisku myszy
function mouseUp(e) {
    if (Object.keys(sounds).indexOf(e.target.id) > -1) {
        e.target.classList.remove('key-pressed')
    }
}


function clickHandler(e) { // funkcja sprawdza na ktorym klawiszu jest myszka i włącza go.
    if (Object.keys(sounds).indexOf(e.target.id) > -1) {
        playKey({
            key: e.target.id
        });
    }
}

//Nagrywanie wybranej ścieżki
function startRecord(numer_sciezki) {
    if (!record[numer_sciezki]) {
        record[numer_sciezki] = true;
        time[numer_sciezki] = Date.now();
        sciezka[numer_sciezki] = [];
        document.getElementById("rButton" + numer_sciezki).innerText = "Stop recording";
    } else {
        record[numer_sciezki] = false;
        document.getElementById("rButton" + numer_sciezki).innerText = "Record track " + numer_sciezki;
        document.getElementById("status" + numer_sciezki).innerText = sciezka[numer_sciezki].length + " Sounds recorded in " + Math.round(sciezka[numer_sciezki][sciezka[numer_sciezki].length - 1].delay / 100) / 10 + "sec";
    }
}

//Funkcja grania muzyki
function playKey(e) {
    sound[sounds[e.key]].currentTime = 0
    sound[sounds[e.key]].play();
    console.log(sounds[e.key]);
    for (i = 1; i <= sciezka.length; i++) {
        if (record[i]) {
            if (Object.keys(sounds).indexOf(e.key) > -1) {
                sciezka[i].push({
                    delay: Date.now() - time[i],
                    key: e.key
                })
            }
        }
    }
}
let timeout = [],
    end = [];

//Funkcja odtwarzania muzyki
function playRecord(numer_sciezki) {
    if (!timeout[numer_sciezki] && sciezka[numer_sciezki][0]) {
        sciezka[numer_sciezki].forEach((e) => {
            timeout[numer_sciezki] = setTimeout(() => {
                playKey(e)
            }, e.delay);
        })
        document.getElementById("playButton" + numer_sciezki).innerText = "Stop playing";
        end[numer_sciezki] = setTimeout(() => playRecord(numer_sciezki), sciezka[numer_sciezki][sciezka[numer_sciezki].length - 1].delay + 10)
    } else {
        clearTimeout(end[numer_sciezki]);
        do {
            clearTimeout(timeout[numer_sciezki]);
        }
        while (timeout[numer_sciezki]--)
        timeout[numer_sciezki] = false;
        document.getElementById("playButton" + numer_sciezki).innerText = "Play track " + numer_sciezki;
    }
}
