document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Range Slider Section
  // ==========================
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minRangeLabel = document.getElementById("minRangeLabel");
  const maxRangeLabel = document.getElementById("maxRangeLabel");

  // Function to update the range slider position and labels
  function updateRange() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    // Ensure min value is always less than max value
    if (minVal >= maxVal) {
      minVal = maxVal - 1;
      minRange.value = minVal;
    }

    const minPercentage =
      ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
    const maxPercentage =
      ((maxVal - maxRange.min) / (maxRange.max - maxRange.min)) * 100;

    rangeTrack.style.left = `${minPercentage}%`;
    rangeTrack.style.width = `${maxPercentage - minPercentage}%`;

    minRangeLabel.textContent = `$${minVal.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxVal.toLocaleString()}`;

    minRangeLabel.style.left = `calc(${minPercentage}% - 20px)`;
    maxRangeLabel.style.left = `calc(${maxPercentage}% - 20px)`;

    // Trigger car data fetch based on updated slider values
    fetchCarData();
  }

  // Event listeners for range slider changes
  minRange.addEventListener("input", updateRange);
  maxRange.addEventListener("input", updateRange);
  minRange.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") minRange.value--;
    if (e.key === "ArrowRight") minRange.value++;
    updateRange();
  });
  maxRange.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") maxRange.value--;
    if (e.key === "ArrowRight") maxRange.value++;
    updateRange();
  });

  // ==========================
  // Car Data Fetching Section
  // ==========================
  const carWrapper = document.getElementById("car__card--wrapper");

  // Function to fetch car data from the API
  async function fetchCarData() {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/cars?min_price=${minRange.value}&max_price=${maxRange.value}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": "EF0QATKkSO8Bo9CprmH1pQ==mz3s8rwiVSK9Nk1r", // Replace with your actual API key
          },
        }
      );

      const data = await response.json();
      console.log(data); // Log the data to check if the fetch was successful
      displayCars(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  }

  // ==========================
  // Display Cars Section
  // ==========================
  // Function to display the cars as cards
  function displayCars(cars) {
    // Clear the car wrapper before adding new cards
    carWrapper.innerHTML = "";

    // Loop through the cars and create a card for each
    cars.forEach((car) => {
      const carCard = document.createElement("div");
      carCard.classList.add("car__card");

      // Card content
      carCard.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car__card--image">
        <div class="car__card--details">
          <h3 class="car__card--name">${car.name}</h3>
          <p class="car__card--description">${car.description}</p>
          <p class="car__card--price">$${car.price.toLocaleString()}</p>
        </div>
      `;

      // Append the new car card to the wrapper
      carWrapper.appendChild(carCard);
    });
  }

  // ==========================
  // Initial Fetch on Page Load
  // ==========================
  fetchCarData(); // Initial fetch when the page loads
});
