// Zoom slider functionality
const zoomSlider = document.getElementById('zoom-slider');
const zoomValue = document.querySelector('.zoom-value');

// Load saved zoom from localStorage
const savedZoom = localStorage.getItem('zoomLevel');
if (savedZoom) {
    zoomSlider.value = savedZoom;
    applyZoom(savedZoom);
} else {
    // Get default zoom from CSS custom property
    const defaultZoomScale =
        parseFloat(
            getComputedStyle(document.body).getPropertyValue('--zoom-scale')
        ) || 0.25;
    const defaultZoomPercent = defaultZoomScale * 100;
    applyZoom(defaultZoomPercent);
}

// Apply zoom function
function applyZoom(value) {
    const scale = value / 100;
    document.body.style.setProperty('--zoom-scale', scale);
    zoomValue.textContent = value + '%';
}

// Zoom slider event listener
zoomSlider.addEventListener('input', function () {
    const value = this.value;
    applyZoom(value);
    localStorage.setItem('zoomLevel', value);
});
