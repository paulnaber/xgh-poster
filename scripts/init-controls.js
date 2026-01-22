// Initialize all control inputs with values from CSS custom properties
// This ensures HTML inputs always reflect the defaults defined in defaults.css

document.addEventListener('DOMContentLoaded', function () {
    const bodyStyles = getComputedStyle(document.body);

    // Initialize zoom slider
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomValue = document.querySelector('.zoom-value');
    if (zoomSlider && !localStorage.getItem('zoomLevel')) {
        const defaultZoomScale =
            parseFloat(bodyStyles.getPropertyValue('--zoom-scale')) || 0.25;
        const defaultZoomPercent = Math.round(defaultZoomScale * 100);
        zoomSlider.value = defaultZoomPercent;
        if (zoomValue) {
            zoomValue.textContent = defaultZoomPercent + '%';
        }
    }

    // Initialize gradient controls
    const gradientInnerOpacity = document.getElementById(
        'gradient-inner-opacity'
    );
    const gradientOuterOpacity = document.getElementById(
        'gradient-outer-opacity'
    );
    const gradientInnerPercent = document.getElementById(
        'gradient-inner-percent'
    );
    const gradientOuterPercent = document.getElementById(
        'gradient-outer-percent'
    );

    if (gradientInnerOpacity) {
        const defaultValue =
            parseFloat(
                bodyStyles.getPropertyValue('--gradient-inner-opacity')
            ) || 0;
        gradientInnerOpacity.value = defaultValue;
        const valueDisplay = document.getElementById('inner-opacity-value');
        if (valueDisplay) valueDisplay.textContent = defaultValue;
    }

    if (gradientOuterOpacity) {
        const defaultValue =
            parseFloat(
                bodyStyles.getPropertyValue('--gradient-outer-opacity')
            ) || 0.7;
        gradientOuterOpacity.value = defaultValue;
        const valueDisplay = document.getElementById('outer-opacity-value');
        if (valueDisplay) valueDisplay.textContent = defaultValue;
    }

    if (gradientInnerPercent) {
        const defaultValue =
            parseInt(bodyStyles.getPropertyValue('--gradient-inner-percent')) ||
            30;
        gradientInnerPercent.value = defaultValue;
        const valueDisplay = document.getElementById('inner-percent-value');
        if (valueDisplay) valueDisplay.textContent = defaultValue + '%';
    }

    if (gradientOuterPercent) {
        const defaultValue =
            parseInt(bodyStyles.getPropertyValue('--gradient-outer-percent')) ||
            100;
        gradientOuterPercent.value = defaultValue;
        const valueDisplay = document.getElementById('outer-percent-value');
        if (valueDisplay) valueDisplay.textContent = defaultValue + '%';
    }

    // Initialize font size controls
    const headlineSize = document.getElementById('headline-size');
    if (headlineSize) {
        const defaultValue =
            parseInt(bodyStyles.getPropertyValue('--headline-size')) || 250;
        headlineSize.value = defaultValue;
    }

    const axiomNumberSize = document.getElementById('axiom-number-size');
    if (axiomNumberSize) {
        const defaultValue =
            parseInt(bodyStyles.getPropertyValue('--axiom-number-size')) || 80;
        axiomNumberSize.value = defaultValue;
    }

    const bodySize = document.getElementById('body-size');
    if (bodySize) {
        const defaultValue =
            parseInt(bodyStyles.getPropertyValue('--body-size')) || 35;
        bodySize.value = defaultValue;
    }

    // Initialize font family selects
    const headlineFont = document.getElementById('headline-font');
    if (headlineFont) {
        const defaultValue =
            bodyStyles.getPropertyValue('--headline-font').trim() ||
            "'academy', sans-serif";
        headlineFont.value = defaultValue;
    }

    const axiomNumberFont = document.getElementById('axiom-number-font');
    if (axiomNumberFont) {
        const defaultValue =
            bodyStyles.getPropertyValue('--axiom-number-font').trim() ||
            "'academy', sans-serif";
        axiomNumberFont.value = defaultValue;
    }

    const bodyFont = document.getElementById('body-font');
    if (bodyFont) {
        const defaultValue =
            bodyStyles.getPropertyValue('--body-font').trim() ||
            "'baskerville', serif";
        bodyFont.value = defaultValue;
    }
});
