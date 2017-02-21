`use strict`

class Itinerary {

	constructor() {

		// Creating locality div.
		const localityDiv = document.createElement(`div`);
		localityDiv.id = `locality`;
		const localityLabel = document.createElement(`p`);
		localityLabel.id = `localitylbl`
		localityLabel.textContent = `City:`;
		const localityInput = document.createElement(`input`);
		localityInput.id = `localityinput`;
		localityInput.setAttribute(`type`, `text`);

		// Appending to DOM
		localityDiv.appendChild(localityLabel);
		localityDiv.appendChild(localityInput);
		document.getElementById(`interface`).appendChild(localityDiv);

		// Creating button div.
		const btns = document.createElement(`div`);
		btns.id = `allbtns`;
		document.getElementById(`interface`).appendChild(btns);

		// Pointers to DOM elements that will be manipulated.
		this.main = document.getElementById(`main`);
		this.locality = localityInput;
		this.lastBtnClicked = null;
		this.allbtns = btns;
	}

	// Loads picture and appends to the DOM.
	loadPic(picUrl) {
		const pic = document.createElement(`img`);
		pic.id = `pic`;
		pic.src = picUrl;
		document.getElementById(`top`).appendChild(pic);
	}

	// Clear out any Loading message or Places div.
	clearPlaces() {
		const loading = document.getElementById(`loading`);
		if (loading) loading.remove();
		const places = document.getElementById(`places`);
		if (places) places.remove();
		const error = document.getElementById(`error`);
		if (error) error.remove();
	}

	// Add Loading message as a placeholder until data returns.
	addLoadingMsg() {
		const loading = document.createElement(`p`);
		loading.id = `loading`;
		loading.textContent = `⏰ Downloading data...`;
		this.main.appendChild(loading);
	}

	// Adds an error message div to the main area.
	errorMsg(message) {
		const error = document.createElement(`p`);
		error.id = `error`;
		error.textContent = `❗${message}`;
		this.main.appendChild(error);
	}

	makeButtons(array) {
		array.forEach(btnpair => {
			const btnCreated = document.createElement(`button`);
			btnCreated.textContent = btnpair.desc;
			btnCreated.className = `btn`;
			btnCreated.id = btnpair.route;

			// Button click listener.
			btnCreated.addEventListener(`click`, e => {

				// Clear anything already in the places div.
				this.clearPlaces();

				// Check for value in locality text input.
				if (this.locality.value === '') return this.errorMsg(`Please type a city into the field above.`);

				// Add temporary loading message.
				this.addLoadingMsg();
				// Sending request to Factual.com API for data.
				const x = new XMLHttpRequest();
				x.open(`POST`, `/${btnpair.route}`, true);
				x.setRequestHeader("Content-type", "application/json");
				x.onload = () => this.showPlaces(JSON.parse(x.responseText));
				x.send(JSON.stringify({ locality: this.locality.value }));

				// Changing button classes for highlighting purposes.
				if (this.lastBtnClicked) this.lastBtnClicked.className = `btn`;
				this.lastBtnClicked = btnCreated;
				this.lastBtnClicked.className = `btn btnselected`;

				// Not choosing to use GPS location due to small radius of Factual.com API search.
				// console.log("Retrieving location from Google Maps API to send...");
				// navigator.geolocation.getCurrentPosition(sendPosition, error);
			})
			// Append button to DOM.
			this.allbtns.appendChild(btnCreated);
		});
	}

	showPlaces(objArr) {

		// Trimming input for neatness.
		this.locality.value = this.locality.value.trim();

		// Clear any existing Loading message or Places div.
		this.clearPlaces();

		// Making new Places div.
		const places = document.createElement(`div`);
		places.id = `places`;

		// Creating div to show all suggested venues.
		objArr.forEach(obj => {

			// Return if no venue.
			if (!obj.venue) return;

			// Begin constructing venue entry.
			const entry = document.createElement(`p`);

			// Description of venue suggestion (not from API).
			const desc = document.createElement(`span`);
			desc.className = `desc`;
			desc.textContent = obj.desc;
			entry.appendChild(desc);

			entry.innerHTML += `<br>`;

			// Name of venue.
			const name = document.createElement(`span`);
			name.className = `name`;
			name.textContent = obj.venue.name;
			entry.appendChild(name);
			// Neighborhood field is not always populated.
			if (obj.venue.neighborhood) {
				entry.innerHTML += ` in `;
				const neighborhood = document.createElement(`span`);
				neighborhood.className = `neighborhood`;
				neighborhood.textContent = obj.venue.neighborhood[0];
				entry.appendChild(neighborhood);
			}

			entry.innerHTML += `<br>`;

			// Building up address.
			const address = document.createElement(`span`);
			address.className = `address`;
			// Some landmarks have no number address.
			if (obj.venue.address) address.textContent += `${obj.venue.address}, `
			address.textContent += `${obj.venue.locality}, ${obj.venue.region} ${obj.venue.postcode}`;

			// Appending Places div to DOM.
			entry.appendChild(address);
			places.appendChild(entry);
			this.main.appendChild(places);
		});
	}
}

// Instantiate Itinerary class.
const Ferris = new Itinerary();

// Load picture of Ferris, Sloan, and Cameron.
Ferris.loadPic(`ferris.jpg`);

// Make buttons.
Ferris.makeButtons([
	{ route: `firstdate`, desc: `First Date` },
	{ route: `seconddate`, desc: `Second Date` },
	{ route: `thirddate`, desc: `Third Date` },
	{ route: `fourthdate`, desc: `Fourth Date` },
	{ route: `fifthdate`, desc: `Fifth Date` },
	{ route: `goingwell`, desc: `Date Going Well` },
	{ route: `meat`, desc: `Craving Meat` },
	{ route: `nomeat`, desc: `Craving Veggies` },
	{ route: `largegroup`, desc: `Large Group` },
	{ route: `nightout`, desc: `Night Out` },
	{ route: `learn`, desc: `Learn` },
	{ route: `allday`, desc: `All Day Experience` },
	{ route: `nogoingback`, desc: `No Going Back` },
	{ route: `nature`, desc: `Nature` },
	{ route: `sweettooth`, desc: `Sweet Tooth` }
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