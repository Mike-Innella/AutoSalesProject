document.addEventListener("DOMContentLoaded", () => {
  // DOM Element References
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minRangeLabel = document.getElementById("minRangeLabel");
  const maxRangeLabel = document.getElementById("maxRangeLabel");
  const carWrapper = document.getElementById("car__card--wrapper");
  const searchBar = document.querySelector(".search__bar");

  // Update Range and Fetch Car Data
  const updateRange = () => {
    let minVal = parseInt(minRange.value, 10);
    let maxVal = parseInt(maxRange.value, 10);

    // Ensure minVal is less than maxVal
    if (minVal >= maxVal) minRange.value = maxVal - 1;

    const minPercentage = ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
    const maxPercentage = ((maxVal - minRange.min) / (maxRange.max - minRange.min)) * 100;

    rangeTrack.style.left = `${minPercentage}%`;
    rangeTrack.style.width = `${maxPercentage - minPercentage}%`;

    minRangeLabel.textContent = `$${minVal.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxVal.toLocaleString()}`;
    minRangeLabel.style.left = `calc(${minPercentage}% - 20px)`;
    maxRangeLabel.style.left = `calc(${maxPercentage}% - 20px)`;

    // Get search query
    const searchQuery = searchBar.value.trim().toLowerCase();
    fetchCarData(minVal, maxVal, searchQuery);
  };

  // Event Listeners for Range Inputs and Search Bar
  minRange.addEventListener("input", updateRange);
  maxRange.addEventListener("input", updateRange);
  searchBar.addEventListener("input", updateRange);

  // Fetch Car Data from API
  const fetchCarData = async (minPrice, maxPrice, searchQuery) => {
    console.log("Fetching data with:", { minPrice, maxPrice, searchQuery });

    // Process the search query for make, model, and year
    const [make, model, year] = searchQuery.split(" ");
    let requestUrl = "https://carapi.app/api"; // Updated base URL

    const params = new URLSearchParams();

    // Append query parameters based on inputs
    if (minPrice >= 0) params.append("min_price", minPrice); // Allow 0 minPrice
    if (maxPrice > 0) params.append("max_price", maxPrice); // Ensure maxPrice is valid
    if (make) params.append("make", make);
    if (model) params.append("model", model);
    if (year) params.append("year", year);

    // Add parameters to the request URL
    requestUrl += `?${params.toString()}`;

    console.log("API Request URL:", requestUrl); // Output URL for debugging

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 93a39874-c6a6-4c25-8a6f-223eaf7d68cb", // Add API key in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        displayCars(data);
      } else {
        const errorText = await response.text();
        console.error("Error fetching data:", response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Display Cars Function
  const displayCars = (cars) => {
    carWrapper.innerHTML = cars.length
      ? cars
          .map(
            (car) => `        
          <div class="car__card">
            <img src="${car.image || "placeholder.jpg"}" alt="${car.name || "Unknown Model"}" class="car__card--image">
            <div class="car__card--details">
              <h3 class="car__card--name">${car.name || "Unknown Model"}</h3>
              <p class="car__card--description">${car.description || "No description available"}</p>
              <p class="car__card--price">$${(car.price || 0).toLocaleString()}</p>
            </div>
          </div>`
          )
          .join(" ")
      : `<p>No cars found for this search.</p>`;
  };

  // Initial Call to Update Range and Display Cars
  updateRange(); // This will call fetchCarData with default parameters on page load
});
