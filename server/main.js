'use strict';

const title = document.createElement('h1');
title.textContent = 'Where To Go?';
title.id = 'title';
document.getElementById('top').appendChild(title);

const allbtns = document.createElement('span');
allbtns.id = 'allbtns'
document.getElementById('main').appendChild(allbtns);

function makeButtons(array) {
    for (let i = 0; i < array.length; i++) {
        const btnCreated = document.createElement('button');
        btnCreated.textContent = array[i][1];
        btnCreated.className = 'btn';
        btnCreated.id = array[i][0];
        btnCreated.addEventListener("click", (e) => {
            if (document.getElementById('loading')) document.getElementById('loading').remove();
            if (document.getElementById('places')) document.getElementById('places').remove();
            const loading = document.createElement('p');
            loading.id = 'loading';
            loading.textContent = 'Downloading data...';
            document.getElementById('main').appendChild(loading);
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/" + array[i][0]);
            xmlhttp.setRequestHeader("Content-type", "text/html");
            xmlhttp.onload = () => { showPlaces(JSON.parse(xmlhttp.responseText)) };
            xmlhttp.send();
            // console.log("Retrieving location from Google Maps API to send...");
            // navigator.geolocation.getCurrentPosition(sendPosition, error);
        });
        document.getElementById('allbtns').appendChild(btnCreated);
    }
}
makeButtons([
    ['firstdate', 'First Date'],
    ['seconddate', 'Second Date'],
    ['thirddate', 'Third Date'],
    ['fourthdate', 'Fourth Date'],
    ['fifthdate', 'Fifth Date'],
    ['goingwell', 'Date Going Well'],
    ['meat', 'Craving Meat'],
    ['nomeat', 'Not Craving Meat'],
    ['largegroup', 'Large Group'],
    ['nightout', 'Night Out'],
    ['learn', 'Learn'],
    ['allday', 'Whole Day Affair'],
    ['nogoingback', 'No Going Back'],
    ['nature', 'Nature'],
    ['sweettooth', 'Sweet Tooth']
]);

function sendPosition(pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitutde;
    console.log("Location obtained from Google Maps API. Sending position object:", pos)
    const xmlhttp = new XMLHttpRequest();
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
    if (document.getElementById('loading')) document.getElementById('loading').remove();
    if (document.getElementById('places')) document.getElementById('places').remove();
    const placesDiv = document.createElement('div');
    placesDiv.id = "places";
    results.forEach(pair => {
        const entry = document.createElement('p');
        const desc = document.createElement('span');
        desc.className = 'desc';
        desc.textContent = pair[1];
        entry.appendChild(desc);
        entry.innerHTML += '<br>';
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = pair[0].name;
        entry.appendChild(name);
        if (pair[0].neighborhood) {
            const neighborhood = document.createElement('span');
            neighborhood.className = 'neighborhood';
            neighborhood.textContent = pair[0].neighborhood[0];
            entry.innerHTML += ' in ';
            entry.appendChild(neighborhood);
        }
        entry.innerHTML += '<br>';
        const address = document.createElement('span');
        address.className = 'address';
        address.textContent = pair[0].address + ", " + pair[0].locality + ", " + pair[0].region + " " + pair[0].postcode;
        entry.appendChild(address);
        placesDiv.appendChild(entry);
        document.getElementById('main').appendChild(placesDiv);
    });
}