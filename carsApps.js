document.addEventListener("DOMContentLoaded", () => {
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minRangeLabel = document.getElementById("minRangeLabel");
  const maxRangeLabel = document.getElementById("maxRangeLabel");

  function updateRange() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);

    // Update range track
    const minPercentage =
      ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
    const maxPercentage =
      ((maxVal - maxRange.min) / (maxRange.max - maxRange.min)) * 100;

    rangeTrack.style.left = `${minPercentage}%`;
    rangeTrack.style.width = `${maxPercentage - minPercentage}%`;

    // Update price labels
    minRangeLabel.textContent = `$${minVal.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxVal.toLocaleString()}`;
  }

  // Initialize the range
  updateRange();
});
