// Fetch API JSON data
let travelData = [];

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("API Loaded:", travelData);
    })
    .catch(error => console.log("Error loading API:", error));

// SEARCH FUNCTION
function searchResults() {
    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (!keyword) return;

    let matchedResults = [];

    if (keyword.includes("beach")) {
        matchedResults = travelData.beaches;
    } else if (keyword.includes("temple")) {
        matchedResults = travelData.temples;
    } else {
        travelData.countries.forEach(country => {
            if (keyword.includes(country.name.toLowerCase())) {
                console.log(country.name);
                country.cities.forEach(city => matchedResults.push(city));
            }
        });
    } 
    if(matchedResults.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    matchedResults.forEach(place => {
        const card = `
            <div class="card">
                <img src="${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
        resultsContainer.innerHTML += card;
    });
}

// CLEAR RESULTS
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}
