`use strict`

// Creating pic
const pic = document.createElement(`img`);
pic.id = `pic`;
pic.src = `ferris.jpg`;
document.getElementById(`top`).appendChild(pic);

// Creating buttons
const allbtns = document.createElement(`div`);
allbtns.id = `allbtns`;
document.getElementById(`nav`).appendChild(allbtns);

// Setting variable to main element
const main = document.getElementById(`main`);

// Clear out any Loading div or Places div
const clearPlaces = () => {
    const loading = document.getElementById(`loading`);
    if (loading) loading.remove();
    const places = document.getElementById(`places`);
    if (places) places.remove();
}

// Create all buttons
const makeButtons = (array) => {
    // console.groupCollapsed("Buttons created");
    for (let i = 0; i < array.length; i++) {
        const btnCreated = document.createElement(`button`);
        btnCreated.textContent = array[i][1];
        btnCreated.className = `btn`;
        btnCreated.id = array[i][0];

        // console.log(`Creating button called ${btnCreated.id}`);

        // Button click listener
        btnCreated.addEventListener(`click`, (e) => {
            // console.log(`Button ${btnCreated.id} pressed`);
            // console.time("Timing getting places");
            // console.profile("Getting places");
            // console.count("arbitrary label")
            // Removing previous loading or places divs if already present
            clearPlaces();

            // Adding a "Loading" message as a placeholder until data returns
            loading = document.createElement(`p`);
            loading.id = `loading`;
            loading.textContent = `⏰ Downloading data...`;
            main.appendChild(loading);

            // Sending request to Factual.com API for data
            const xhr = new XMLHttpRequest();
            xhr.open(`POST`, `/${array[i][0]}`);
            xhr.setRequestHeader("Content-type", "text/html");
            xhr.onload = () => { showPlaces(JSON.parse(xhr.responseText)) };
            xhr.send();

            // Resetting button classes for highlighting purposes
            const allButtons = document.getElementsByClassName(`btn`);
            const abLength = allButtons.length;
            for (let i = 0; i < abLength; i++) allButtons[i].className = `btn`;
            btnCreated.className = `btn btnselected`;
            // Not choosing to use GPS location due to small radius of Factual.com API search
            // console.log("Retrieving location from Google Maps API to send...");
            // navigator.geolocation.getCurrentPosition(sendPosition, error);
        });
        allbtns.appendChild(btnCreated);
    }
    // console.groupEnd("Buttons created");
}

// Create Places div
const showPlaces = (results) => {
    // Removing previous loading or places divs if already present
    clearPlaces();

    // console.table(results);

    // Making new places div
    places = document.createElement(`div`);
    places.id = `places`;

    // console.timeStamp("Places div created");

    results.forEach(pair => {

        // console.count("Getting another place");
        const entry = document.createElement(`p`);

        // Description/comment (not from API)
        const desc = document.createElement(`span`);
        desc.className = `desc`;
        desc.textContent = pair[1];
        entry.appendChild(desc);

        entry.innerHTML += `<br>`;

        // Name of place
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

        // Building up address
        const address = document.createElement(`span`);
        address.className = `address`;
        // Some landmarks have no number address
        if (pair[0].address) address.textContent += `${pair[0].address}, `
        address.textContent += `${pair[0].locality}, ${pair[0].region} ${pair[0].postcode}`;

        // Appending divs to DOM
        entry.appendChild(address);
        places.appendChild(entry);
        main.appendChild(places);
    }); // Done adding places to DOM
    // console.assert(document.getElementById("firstdate").className === `btn btnselected`, "First Date not selected");
    // console.log(places);
    // console.dirxml(places);
    // console.dir(places);
    // console.trace("Done adding places");
    // console.timeEnd("Timing getting places");
    // console.profileEnd();
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

// const sendPosition = (pos) => {
//     const lat = pos.coords.latitude;
//     const long = pos.coords.longitutde;
//     console.log(`Location obtained from Google Maps API. Sending position object: ${pos}`)
//     const xml = new XMLHttpRequest();
//     xml.open(`POST`, { url: `/firstdate`, lat: lat, long: long });
//     xml.setRequestHeader(`Content-type`, `application/json`);
//     xml.onLoad = (results) => { showPlaces(results) }
//     xml.send();
// }

// const error = (err) => { console.error(`ERROR getting geolocation (Code ${err.code} ): ${err.message}`) };