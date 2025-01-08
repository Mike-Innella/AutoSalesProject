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
    const maxPercentage = ((maxVal - maxRange.min) / (maxRange.max - minRange.min)) * 100;

    rangeTrack.style.left = `${minPercentage}%`;
    rangeTrack.style.width = `${maxPercentage - minPercentage}%`;

    minRangeLabel.textContent = `$${minVal.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxVal.toLocaleString()}`;
    minRangeLabel.style.left = `calc(${minPercentage}% - 20px)`;
    maxRangeLabel.style.left = `calc(${maxPercentage}% - 20px)`;

    // Get search query
    const searchQuery = searchBar.value.toLowerCase();
    fetchCarData(minVal, maxVal, searchQuery);
  };

  // Event Listeners for Range Inputs and Search Bar
  minRange.addEventListener("input", updateRange);
  maxRange.addEventListener("input", updateRange);
  searchBar.addEventListener("input", updateRange);

  // Fetch Car Data from API
  const fetchCarData = async (minPrice, maxPrice, searchQuery) => {
    // Log the values for debugging
    console.log("Fetching data with:", { minPrice, maxPrice, searchQuery });

    const [make, model, year] = searchQuery.split(" ");
    let requestUrl = `https://api.api-ninjas.com/v1/cars?min_price=${minPrice}&max_price=${maxPrice}`;

    // Append search query parameters if available
    if (make) requestUrl += `&make=${make}`;
    if (model) requestUrl += `&model=${model}`;
    if (year) requestUrl += `&year=${year}`;

    console.log("API Request URL:", requestUrl); // Log URL for debugging

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "FPgsOZsD1A19c5eNmtj3XJ0FtE9BXmdkO6IMHDQg", // Ensure this is correct
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          displayCars(data); // Display cars if valid data is returned
        } else {
          console.error("No cars found or invalid data format");
        }
      } else {
        console.error("Error fetching data:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Display Cars Function
  const displayCars = (cars) => {
    carWrapper.innerHTML = cars.length
      ? cars.map(
          (car) => `
          <div class="car__card">
            <img src="${car.image || "placeholder.jpg"}" alt="${car.name || "Unknown Model"}" class="car__card--image">
            <div class="car__card--details">
              <h3 class="car__card--name">${car.name || "Unknown Model"}</h3>
              <p class="car__card--description">${car.description || "No description available"}</p>
              <p class="car__card--price">$${(car.price || 0).toLocaleString()}</p>
            </div>
          </div>`
        ).join("")
      : `<p>No cars found for this search.</p>`;
  };

  // Initial Call to Update Range and Display Cars
  updateRange();
});
