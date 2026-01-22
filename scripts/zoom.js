// Zoom slider functionality
const zoomSlider = document.getElementById('zoom-slider');
const zoomValue = document.querySelector('.zoom-value');
const container = document.querySelector('.container');

// Load saved zoom from localStorage
const savedZoom = localStorage.getItem('zoomLevel');
if (savedZoom) {
    zoomSlider.value = savedZoom;
    applyZoom(savedZoom);
} else {
    // Apply default zoom of 25%
    applyZoom(25);
}

// Apply zoom function
function applyZoom(value) {
    const scale = value / 100;
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'top left';
    zoomValue.textContent = value + '%';
}

// Zoom slider event listener
zoomSlider.addEventListener('input', function () {
    const value = this.value;
    applyZoom(value);
    localStorage.setItem('zoomLevel', value);
});
