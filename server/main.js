`use strict`
const title = document.createElement(`h1`);
title.textContent = `Life is Short. Don't Waste It.`;
title.id = `title`;
document.getElementById(`top`).appendChild(title);

const pic = document.createElement(`img`);
pic.id = `pic`;
pic.src = `ferris.jpg`;
pic.width = `420`;
document.getElementById(`top`).appendChild(pic);

const main = document.getElementById(`main`);

const allbtns = document.createElement(`div`);
allbtns.id = `allbtns`
document.getElementById(`nav`).appendChild(allbtns);

const makeButtons = (array) => {
    for (let i = 0; i < array.length; i++) {
        const btnCreated = document.createElement(`button`);
        btnCreated.textContent = array[i][1];
        btnCreated.className = `btn`;
        btnCreated.id = array[i][0];
        // Button click listener
        btnCreated.addEventListener(`click`, (e) => {
            console.profile("Getting places");
            console.time("Timing getting places");
            console.markTimeline("MARKTIMELINE: Button pressed");
            // Removing previous loading or places divs if already present
            let loading = document.getElementById(`loading`);
            if (loading) loading.remove();
            let places = document.getElementById(`places`);
            if (places) places.remove();
            // Adding a "Loading" message as a placeholder until data returns
            loading = document.createElement(`p`);
            loading.id = `loading`;
            loading.textContent = `⏱ Downloading data...`;
            main.appendChild(loading);
            // Sending request to Factual.com API for data
            const xml = new XMLHttpRequest();
            xml.open(`POST`, `/${array[i][0]}`);
            xml.setRequestHeader("Content-type", "text/html");
            xml.onload = () => { showPlaces(JSON.parse(xml.responseText)) };
            xml.send();
            // Resetting button classes for highlighting purposes
            const allButtons = document.getElementsByClassName(`btn`);
            const abLength = allButtons.length;
            for (let i = 0; i < abLength; i++) allButtons[i].className = `btn`
            btnCreated.className = `btn btnselected`;
            // Not choosing to use GPS location due to small radius of Factual.com API search
            // console.log("Retrieving location from Google Maps API to send...");
            // navigator.geolocation.getCurrentPosition(sendPosition, error);
        });
        allbtns.appendChild(btnCreated);
    }
}

const sendPosition = (pos) => {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitutde;
    console.log(`Location obtained from Google Maps API. Sending position object: ${pos}`)
    const xml = new XMLHttpRequest();
    xml.open(`POST`, { url: `/firstdate`, lat: lat, long: long });
    xml.setRequestHeader(`Content-type`, `application/json`);
    xml.onLoad = (results) => { showPlaces(results) }
    xml.send();
}

const error = (err) => { console.error(`ERROR getting geolocation (Code ${err.code} ): ${err.message}`) };

const showPlaces = (results) => {
    // Removing previous loading or places divs if already present
    let loading = document.getElementById(`loading`);
    if (loading) loading.remove();
    let places = document.getElementById(`places`);
    if (places) places.remove();
    // Making new place
    places = document.createElement(`div`);
    console.timeStamp("TIMESTAMP: Places div created");
    places.id = `places`;
    results.forEach(pair => {
        const entry = document.createElement(`p`);
        const desc = document.createElement(`span`);
        desc.className = `desc`;
        desc.textContent = pair[1];
        entry.appendChild(desc);
        entry.innerHTML += `<br>`;
        const name = document.createElement(`span`);
        name.className = `name`;
        name.textContent = pair[0].name;
        entry.appendChild(name);
        // Neighborhood field is not always populated
        if (pair[0].neighborhood) {
            entry.innerHTML += ` in `;
            const neighborhood = document.createElement(`span`);
            neighborhood.className = `neighborhood`;
            neighborhood.textContent = pair[0].neighborhood[0];
            entry.appendChild(neighborhood);
        }
        entry.innerHTML += `<br>`;
        const address = document.createElement(`span`);
        address.className = `address`;
        address.textContent = `${pair[0].address}, ${pair[0].locality}, ${pair[0].region} ${pair[0].postcode}`;
        entry.appendChild(address);
        places.appendChild(entry);
        main.appendChild(places);
    });
    // Done adding places to DOM
    console.dirxml(places);
    console.trace("STACK TRACE: Done adding places");
    console.timeEnd("Timing getting places");
    console.profileEnd();
}

makeButtons([
    [`firstdate`, `First Date`],
    [`seconddate`, `Second Date`],
    [`thirddate`, `Third Date`],
    [`fourthdate`, `Fourth Date`],
    [`fifthdate`, `Fifth Date`],
    [`goingwell`, `Date Going Well`],
    [`meat`, `Craving Meat`],
    [`nomeat`, `Craving Veggies`],
    [`largegroup`, `Large Group`],
    [`nightout`, `Night Out`],
    [`learn`, `Learn`],
    [`allday`, `All Day Experience`],
    [`nogoingback`, `No Going Back`],
    [`nature`, `Nature`]//,
    //[`sweettooth`, `Sweet Tooth`]
]);