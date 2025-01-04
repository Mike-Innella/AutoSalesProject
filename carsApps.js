function updateRange() {
    const minRange = document.getElementById('minRange');
    const maxRange = document.getElementById('maxRange');
    const minRangeLabel = document.getElementById('minRangeLabel');
    const maxRangeLabel = document.getElementById('maxRangeLabel');
    const rangeTrack = document.getElementById('rangeTrack');
  
    const minValue = parseInt(minRange.value);
    const maxValue = parseInt(maxRange.value);
    const rangeMin = parseInt(minRange.min);
    const rangeMax = parseInt(maxRange.max);
  
    // Ensure min range does not exceed max range
    if (minValue > maxValue) {
      minRange.value = maxValue;
    }
  
    // Update the displayed price labels
    minRangeLabel.textContent = `$${minValue.toLocaleString()}`;
    maxRangeLabel.textContent = `$${maxValue.toLocaleString()}`;
  
    // Calculate track positions
    const minPercent = ((minValue - rangeMin) / (rangeMax - rangeMin)) * 100;
    const maxPercent = ((maxValue - rangeMin) / (rangeMax - rangeMin)) * 100;
  
    // Set the track position and width
    rangeTrack.style.left = `${minPercent}%`;
    rangeTrack.style.right = `${100 - maxPercent}%`;
  }
  