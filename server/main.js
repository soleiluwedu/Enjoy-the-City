'use strict';

const title = document.createElement('h1');
title.textContent = 'Where To Go?';
title.id = 'title';
document.getElementById('top').appendChild(title);


const btn = document.createElement('button');
btn.textContent = 'First Date';
btn.className = 'btn';
btn.id = 'firstdate';
btn.addEventListener("click", (e) => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/firstdate");
    xmlhttp.setRequestHeader("Content-type", "text/html");
    xmlhttp.onload = () => { showPlaces(JSON.parse(xmlhttp.responseText)) };
    xmlhttp.send();
    // console.log("Retrieving location from Google Maps API to send...");
    // navigator.geolocation.getCurrentPosition(sendPosition, error);
});
document.getElementById('main').appendChild(btn);

function sendPosition(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitutde;
    console.log("Location obtained from Google Maps API. Sending position object:", pos)
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", { url: "/firstdate", lat: lat, long: long });
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onLoad = (results) => { showPlaces(results) }
    xmlhttp.send();
}

function error(err) {
    console.warn('ERROR (Code: ' + err.code + '): ' + err.message);
};


function showPlaces(results) {
    console.log("showPlaces. results =", results)
    if (document.getElementById('places')) document.getElementById('places').remove();
    const placesDiv = document.createElement('div');
    placesDiv.id = "places";
    results.forEach(place => {
        const entry = document.createElement('p');
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = place.name;
        entry.appendChild(name);
        if (place.neighborhood) {
            const neighborhood = document.createElement('span');
            neighborhood.className = 'neighborhood';
            neighborhood.textContent = place.neighborhood[0];
            entry.innerHTML += ' in ';
            entry.appendChild(neighborhood);
        }
        placesDiv.appendChild(entry);
        document.getElementById('main').appendChild(placesDiv);
    });
}