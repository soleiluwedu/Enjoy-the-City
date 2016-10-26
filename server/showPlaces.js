function showPlaces(results) {
    console.log("showPlaces")
    document.getElementById('places').remove();
    const placesDiv = document.createElement('div');
    placesDiv.id = "places";
    results.forEach(place => {
        const entry = document.createElement('p');
        entry.textContent = place.name + place.neighborhood ? place.neighborhood[0] : '';
        placesDiv.appendChild(entry);
    });
}

module.exports = showPlaces;