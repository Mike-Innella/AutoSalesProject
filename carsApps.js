document.addEventListener("DOMContentLoaded", () => {
  // **DOM Element References**
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minRangeLabel = document.getElementById("minRangeLabel");
  const maxRangeLabel = document.getElementById("maxRangeLabel");
  const carWrapper = document.getElementById("car__card--wrapper");
  const modelInput = document.getElementById("model");
  const makeInput = document.getElementById("make");
  const yearInput = document.getElementById("year");

  // **Update Range and Fetch Car Data**
  const updateRange = () => {
    let minVal = parseInt(minRange.value, 10);
    let maxVal = parseInt(maxRange.value, 10);

    // Ensure min value is not greater than max value
    if (minVal >= maxVal) {
      minVal = maxVal - 1;
      minRange.value = minVal;
    }

    // Calculate the percentage for the range track
    const minPercentage =
      ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
    const maxPercentage =
      ((maxVal - maxRange.min) / (maxRange.max - maxRange.min)) * 100;

    // Update the range track width and position
    rangeTrack.style.left = `${minPercentage}%`;
    rangeTrack.style.width = `${maxPercentage - minPercentage}%`;

    // Update the labels for min and max values
    minRangeLabel.textContent = `$${minVal.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxVal.toLocaleString()}`;
    minRangeLabel.style.left = `calc(${minPercentage}% - 20px)`;
    maxRangeLabel.style.left = `calc(${maxPercentage}% - 20px)`;

    // Fetch car data based on the selected range
    fetchCarData(minVal, maxVal);
  };

  // **Event Listeners for Range Inputs**
  minRange.addEventListener("input", updateRange);
  maxRange.addEventListener("input", updateRange);

  // **Fetch Car Data from API**
  const fetchCarData = async (minPrice, maxPrice) => {
    const model = modelInput.value.trim();
    const make = makeInput.value.trim();
    const year = yearInput.value.trim();

    // Skip fetch if any input is empty
    if (!model || !make || !year) return;

    const requestUrl = `https://api.api-ninjas.com/v1/cars?model=${model}&make=${make}&year=${year}&min_price=${minPrice}&max_price=${maxPrice}`;

    try {
      // Send the fetch request to the API
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "FPgsOZsD1A19c5eNmtj3XJ0FtE9BXmdkO6IMHDQg",
        },
      });

      // If the response is not OK, skip further processing
      if (!response.ok) return;

      const data = await response.json();
      // If the response is an array, display the cars
      if (Array.isArray(data)) displayCars(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // **Display Cars on the Page**
  const displayCars = (cars) => {
    carWrapper.innerHTML = cars.length
      ? cars
          .map(
            (car) => `
              <div class="car__card">
                <img src="${car.image || "placeholder.jpg"}" alt="${
              car.name || "Unknown Model"
            }" class="car__card--image">
                <div class="car__card--details">
                  <h3 class="car__card--name">${
                    car.name || "Unknown Model"
                  }</h3>
                  <p class="car__card--description">${
                    car.description || "No description available"
                  }</p>
                  <p class="car__card--price">$${(
                    car.price || 0
                  ).toLocaleString()}</p>
                </div>
              </div>`
          )
          .join("")
      : "<p>No cars found within the selected range.</p>";
  };

  // **Initial Call to Update Range and Display Cars**
  updateRange();
});
