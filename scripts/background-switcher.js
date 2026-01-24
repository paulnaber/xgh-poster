// Background Switcher
document.addEventListener('DOMContentLoaded', function () {
    const backgroundSelector = document.getElementById('background-selector');
    const backgroundOpacity = document.getElementById('background-opacity');
    const backgroundOpacityValue = document.getElementById(
        'background-opacity-value'
    );
    const backgroundInvert = document.getElementById('background-invert');
    const backgroundInvertValue = document.getElementById(
        'background-invert-value'
    );

    // Load saved values from localStorage
    const savedBackground = localStorage.getItem('background-image');
    const savedOpacity = localStorage.getItem('background-opacity');
    const savedInvert = localStorage.getItem('background-invert');

    if (backgroundSelector) {
        // Get current background from CSS custom property or localStorage
        const currentBackground =
            savedBackground ||
            getComputedStyle(document.body)
                .getPropertyValue('--background-image')
                .trim();

        // Set the select to match current value if found
        if (currentBackground) {
            backgroundSelector.value = currentBackground;
            document.body.style.setProperty(
                '--background-image',
                currentBackground
            );
        }

        // Listen for background changes
        backgroundSelector.addEventListener('change', function () {
            const selectedBackground = this.value;
            document.body.style.setProperty(
                '--background-image',
                selectedBackground
            );
            localStorage.setItem('background-image', selectedBackground);
        });
    }

    if (backgroundOpacity && backgroundOpacityValue) {
        // Get current opacity from localStorage or CSS custom property
        const currentOpacity =
            savedOpacity ||
            getComputedStyle(document.body)
                .getPropertyValue('--background-opacity')
                .trim();

        // Set the slider to match current value if found
        if (currentOpacity) {
            backgroundOpacity.value = currentOpacity;
            backgroundOpacityValue.textContent =
                parseFloat(currentOpacity).toFixed(2);
            document.body.style.setProperty(
                '--background-opacity',
                currentOpacity
            );
        }

        // Listen for opacity changes
        backgroundOpacity.addEventListener('input', function () {
            const opacity = this.value;
            document.body.style.setProperty('--background-opacity', opacity);
            backgroundOpacityValue.textContent = parseFloat(opacity).toFixed(2);
            localStorage.setItem('background-opacity', opacity);
        });
    }

    if (backgroundInvert && backgroundInvertValue) {
        // Get current invert from localStorage or CSS custom property
        const currentInvert =
            savedInvert ||
            getComputedStyle(document.body)
                .getPropertyValue('--background-invert')
                .trim();

        // Set the slider to match current value if found
        if (currentInvert) {
            backgroundInvert.value = currentInvert;
            backgroundInvertValue.textContent =
                parseFloat(currentInvert).toFixed(2);
            document.body.style.setProperty(
                '--background-invert',
                currentInvert
            );
        }

        // Listen for invert changes
        backgroundInvert.addEventListener('input', function () {
            const invert = this.value;
            document.body.style.setProperty('--background-invert', invert);
            backgroundInvertValue.textContent = parseFloat(invert).toFixed(2);
            localStorage.setItem('background-invert', invert);
        });
    }
});
