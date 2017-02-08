`use strict`

class Itinerary {

  constructor() {
    this.main = document.getElementById(`main`);
    this.allbtns = null;
    this.lastBtnClicked = null;
  }

  createPic() {
    // Creating pic
    const pic = document.createElement(`img`);
    pic.id = `pic`;
    pic.src = `ferris.jpg`;
    document.getElementById(`top`).appendChild(pic);
  }

  createBtnDiv() {
    // Creating button div
    const btns = document.createElement(`div`);
    btns.id = `allbtns`;
    document.getElementById(`nav`).appendChild(btns);
    this.allbtns = btns;
  }

  clearPlaces() {
    // Clear out any Loading message or Places div
    const loading = document.getElementById(`loading`);
    if (loading) loading.remove();
    const places = document.getElementById(`places`);
    if (places) places.remove();
  }

  addLoadingMsg() {
    // Add "Loading" message as a placeholder until data returns
    const loading = document.createElement(`p`);
    loading.id = `loading`;
    loading.textContent = `⏰ Downloading data...`;
    this.main.appendChild(loading);
  }

  makeButtons(array) {
    array.forEach(btnpair => {
      const btnCreated = document.createElement(`button`);
      btnCreated.textContent = btnpair[1];
      btnCreated.className = `btn`;
      btnCreated.id = btnpair[0];

      // Button click listener
      btnCreated.addEventListener(`click`, e => {

        this.clearPlaces();

        this.addLoadingMsg();

        // Sending request to Factual.com API for data
        const xhr = new XMLHttpRequest();
        xhr.open(`GET`, `/${btnpair[0]}`);
        xhr.setRequestHeader("Content-type", "text/html");
        xhr.onload = () => this.showPlaces(JSON.parse(xhr.responseText));
        xhr.send();

        // Changing button classes for highlighting purposes
        if (this.lastBtnClicked) this.lastBtnClicked.className = `btn`;
        this.lastBtnClicked = btnCreated;
        this.lastBtnClicked.className = `btn btnselected`;

        // Not choosing to use GPS location due to small radius of Factual.com API search
        // console.log("Retrieving location from Google Maps API to send...");
        // navigator.geolocation.getCurrentPosition(sendPosition, error);
      })
      // Append button to DOM
      this.allbtns.appendChild(btnCreated);
    });
  }

  showPlaces(results) {
    this.clearPlaces();

    // Making new places div
    const places = document.createElement(`div`);
    places.id = `places`;

    results.forEach(pair => {

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
      this.main.appendChild(places);
    });
  }
}
const Ferris = new Itinerary();
Ferris.createPic();
Ferris.createBtnDiv();
Ferris.makeButtons([
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