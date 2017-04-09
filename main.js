'use strict'

// ES6 class Itinerary.
class Itinerary {

  constructor() {

    // Creating locality div.
    const localityDiv = document.createElement('div');
    localityDiv.id = 'locality';

    // Locality label.
    const localityLabel = document.createElement('p');
    localityLabel.id = 'localitylbl';
    localityLabel.textContent = 'Explore the City:';

    // Locality input text field.
    const localityInput = document.createElement('input');
    localityInput.id = 'localityinput';
    localityInput.setAttribute('type', 'text');

    // Credit div.
    const credit = document.createElement('p');
    credit.id = 'credit';
    credit.innerHTML = 'Presented by Thai-Duong Nguyen<br>Powered by the Factual.com Places API';

    // Appending locality div to DOM.
    localityDiv.appendChild(localityLabel);
    localityDiv.appendChild(localityInput);
    localityDiv.appendChild(credit);
    document.getElementById('interface').appendChild(localityDiv);

    // Pointers to DOM elements that will be manipulated.
    this.main = document.getElementById('main');
    this.locality = localityInput;
    this.lastBtnClicked = null;
  }

  // Clear out main div.
  clearMain() {
    this.main.textContent = null;
  }

  // Add Loading message as a placeholder until data returns.
  addLoadingMsg() {
    const loading = document.createElement('p');
    loading.id = 'loading';
    loading.textContent = '📡 Searching for data...';
    this.main.appendChild(loading);
  }

  // Adds an error message div to the main area.
  errorMsg(message) {
    this.clearMain();
    const error = document.createElement('p');
    error.id = 'error';
    error.textContent = `❗${message}`;
    this.main.appendChild(error);
  }

  // Generate buttons from array of objects, each object with route and description.
  makeButtons(routeDescArr) {

    // Creating button div.
    const allbtns = document.createElement('div');
    allbtns.id = 'allbtns';

    // For each route/description object in the array...
    routeDescArr.forEach(btnpair => {
      const btnCreated = document.createElement('button');
      btnCreated.textContent = btnpair.desc;
      btnCreated.className = 'btn';
      btnCreated.id = btnpair.route;

      // Button click listener.
      btnCreated.addEventListener('click', e => {

        // Trimming input for neatness.
        this.locality.value = this.locality.value.trim();

        // Clear out main div.
        this.clearMain();

        // Check for value in locality text input.
        if (this.locality.value === '') return this.errorMsg('Please type a city into the field above.');

        // Add temporary loading message.
        this.addLoadingMsg();

        // Sending request to Factual.com API for data.
        const vanilla = new XMLHttpRequest;
        vanilla.open('POST', btnpair.route, true);
        vanilla.setRequestHeader("Content-type", "application/json");
        vanilla.onload = () => {
          const response = JSON.parse(vanilla.responseText);
          if (response.error_type) this.errorMsg(response.message);
          else this.showPlaces(response);
        }
        vanilla.send(JSON.stringify({ locality: this.locality.value }));

        // Changing button classes for highlighting purposes.
        if (this.lastBtnClicked) this.lastBtnClicked.className = 'btn';
        this.lastBtnClicked = btnCreated;
        this.lastBtnClicked.className = 'btn btnselected';
      })

      // Append button to allbtns div.
      allbtns.appendChild(btnCreated);
    });

    // Append allbtns div to DOM.
    document.getElementById('interface').appendChild(allbtns);
  }

  // Accepts array of object, each object with venue information, and shows the info on the DOM.
  showPlaces(objArr) {

    // Clear out main div.
    this.clearMain();

    // Making new places div.
    const places = document.createElement('div');
    places.id = 'places';

    // Creating div to show all suggested venues.
    objArr.forEach(obj => {

      // Return if no venue.
      if (!obj.venue) return;

      // Begin constructing venue entry.
      const entry = document.createElement('p');

      // Description of venue suggestion (not from API).
      const desc = document.createElement('span');
      desc.className = 'desc';
      desc.textContent = obj.desc;
      entry.appendChild(desc);

      entry.innerHTML += '<br>';

      // Name of venue.
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = obj.venue.name;
      entry.appendChild(name);

      // Neighborhood field is not always populated.
      if (obj.venue.neighborhood) {
        entry.innerHTML += ' in ';
        const neighborhood = document.createElement('span');
        neighborhood.className = 'neighborhood';
        neighborhood.textContent = obj.venue.neighborhood[0];
        entry.appendChild(neighborhood);
      }

      entry.innerHTML += '<br>';

      // Building up address.
      const address = document.createElement('span');
      address.className = 'address';
      // Some landmarks have no number address.
      if (obj.venue.address) address.textContent += `${obj.venue.address}, `
      address.textContent += `${obj.venue.locality}, ${obj.venue.region} ${obj.venue.postcode}`;

      // Appending address span to entry div and entry div to places div.
      entry.appendChild(address);
      places.appendChild(entry);
    });
    // Appending places div to DOM.
    this.main.appendChild(places);
  }
}

// Instantiate object of Itinerary class. Named after Ferris Bueller's Day Off.
const Ferris = new Itinerary;

// Make buttons.
Ferris.makeButtons([
  { route: '/firstdate', desc: 'First Date' },
  { route: '/seconddate', desc: 'Second Date' },
  { route: '/thirddate', desc: 'Third Date' },
  { route: '/fourthdate', desc: 'Fourth Date' },
  { route: '/fifthdate', desc: 'Fifth Date' },
  { route: '/goingwell', desc: 'Date Going Well' },
  { route: '/meat', desc: 'Craving Meat' },
  { route: '/nomeat', desc: 'Craving Veggies' },
  { route: '/largegroup', desc: 'Large Group' },
  { route: '/nightout', desc: 'Night Out' },
  { route: '/learn', desc: 'Learn' },
  { route: '/allday', desc: 'All Day Experience' },
  { route: '/nogoingback', desc: 'No Going Back' },
  { route: '/nature', desc: 'Nature' },
  { route: '/sweettooth', desc: 'Sweet Tooth' }
]);
