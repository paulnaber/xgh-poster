// Background Switcher
document.addEventListener('DOMContentLoaded', function () {
    const backgroundSelector = document.getElementById('background-selector');

    if (backgroundSelector) {
        // Get current background from CSS custom property
        const currentBackground = getComputedStyle(document.body)
            .getPropertyValue('--background-image')
            .trim();

        // Set the select to match current value if found
        if (currentBackground) {
            backgroundSelector.value = currentBackground;
        }

        // Listen for background changes
        backgroundSelector.addEventListener('change', function () {
            const selectedBackground = this.value;
            document.body.style.setProperty(
                '--background-image',
                selectedBackground
            );
        });
    }
});
