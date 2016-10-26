'use strict';

const title = document.createElement('h1');
title.textContent = 'Things To Do.';
title.className = 'title';
document.getElementById('top').appendChild(title);


const btn = document.createElement('button');
btn.textContent = 'Find Something To Do';
btn.className = 'btn';
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
        entry.textContent = place.name;
        entry.textContent += place.neighborhood ? ' in ' + place.neighborhood[0] : '';
        placesDiv.appendChild(entry);
        document.getElementById('main').appendChild(placesDiv);
    });
}