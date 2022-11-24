let reportAcuditis = [
    { joke: null, score: null, date: null },
];
const reportJokes = [];
let jokeRes = null;
let count = 0;
let bgCount = 2;
const container_joke = document.querySelector("#joke");
const container_weather = document.querySelector("#weather");
//SCORE + GUARDAR COLECCION
function getScore(sc) {
    if (jokeRes === null) {
        alert("Click next joke button first");
    }
    else {
        reportAcuditis.map((item) => {
            item.joke = jokeRes;
            item.score = sc;
            item.date = new Date().toISOString();
        });
        for (let i = 0; i < reportAcuditis.length; i++) {
            reportJokes.push(Object.assign({}, reportAcuditis[i]));
        }
        jokeRes = null;
    }
    console.log(reportJokes);
}
//FETCH BROMAS
function getRandomJoke() {
    if (count % 2 === 0) {
        fetch("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((response) => {
            container_joke.innerHTML = `<p class="joke">${response.joke}</p>`;
            jokeRes = response.joke;
            changeBackground();
            count++;
        });
    }
    else {
        fetch("https://api.chucknorris.io/jokes/random")
            .then((res) => res.json())
            .then((response) => {
            container_joke.innerHTML = `<p class="joke">${response.value}</p>`;
            jokeRes = response.value;
            changeBackground();
            count++;
        });
    }
}
//FETCH METEO + Hora Actual
const myDate = new Date();
const myHours = myDate.getHours();
fetch("https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&hourly=temperature_2m")
    .then((res) => res.json())
    .then((response) => {
    container_weather.innerHTML = `<p class="temp">|  ${response.hourly.temperature_2m[myHours]}ºC</p>`;
});
//CAMBIO SVG
function changeBackground() {
    const background = document.querySelector("#container_blob");
    const backP = document.querySelector("#blobP");
    const backT = document.querySelector("#blobT");
    background.style.backgroundImage = "url(images/blob" + bgCount + ".svg)";
    backP.style.backgroundImage = "url(imgP/bp" + bgCount + ".svg)";
    backT.style.backgroundImage = "url(imgT/bt" + bgCount + ".svg)";
    bgCount++;
    if (bgCount === 4) {
        bgCount = 1;
    }
}
