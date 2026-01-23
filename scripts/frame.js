// Frame controls for poster border
document.addEventListener('DOMContentLoaded', function () {
    const frameEnabled = document.getElementById('frame-enabled');
    const frameThickness = document.getElementById('frame-thickness');
    const frameDistance = document.getElementById('frame-distance');
    const frameRadius = document.getElementById('frame-radius');
    const frameOpacity = document.getElementById('frame-opacity');
    const frameOpacityValue = document.getElementById('frame-opacity-value');
    const frameStyle = document.getElementById('frame-style');
    const frameColorButtons = document.querySelectorAll('.frame-color-btn');

    // Load saved frame settings from localStorage
    const savedFrameEnabled = localStorage.getItem('frame-enabled');
    const savedFrameThickness = localStorage.getItem('frame-thickness');
    const savedFrameDistance = localStorage.getItem('frame-distance');
    const savedFrameRadius = localStorage.getItem('frame-radius');
    const savedFrameOpacity = localStorage.getItem('frame-opacity');
    const savedFrameStyle = localStorage.getItem('frame-style');
    const savedFrameColor = localStorage.getItem('frame-color');

    if (savedFrameEnabled !== null) {
        frameEnabled.checked = savedFrameEnabled === 'true';
        document.body.style.setProperty(
            '--frame-enabled',
            frameEnabled.checked ? '1' : '0'
        );
    }

    if (savedFrameThickness) {
        frameThickness.value = savedFrameThickness;
        document.body.style.setProperty(
            '--frame-thickness',
            savedFrameThickness + 'px'
        );
    }

    if (savedFrameDistance) {
        frameDistance.value = savedFrameDistance;
        document.body.style.setProperty(
            '--frame-distance',
            savedFrameDistance + 'px'
        );
    }

    if (savedFrameRadius) {
        frameRadius.value = savedFrameRadius;
        document.body.style.setProperty(
            '--frame-radius',
            savedFrameRadius + 'px'
        );
    }

    if (savedFrameOpacity) {
        frameOpacity.value = savedFrameOpacity;
        frameOpacityValue.textContent =
            parseFloat(savedFrameOpacity).toFixed(2);
        document.body.style.setProperty('--frame-opacity', savedFrameOpacity);
    }

    if (savedFrameStyle) {
        frameStyle.value = savedFrameStyle;
        document.body.style.setProperty('--frame-style', savedFrameStyle);
    }

    if (savedFrameColor) {
        document.body.style.setProperty('--frame-color', savedFrameColor);
    }

    // Frame enabled/disabled toggle
    frameEnabled.addEventListener('change', function () {
        const enabled = this.checked ? '1' : '0';
        document.body.style.setProperty('--frame-enabled', enabled);
        localStorage.setItem('frame-enabled', this.checked);
    });

    // Frame thickness control
    frameThickness.addEventListener('input', function () {
        document.body.style.setProperty('--frame-thickness', this.value + 'px');
        localStorage.setItem('frame-thickness', this.value);
    });

    // Frame distance control
    frameDistance.addEventListener('input', function () {
        document.body.style.setProperty('--frame-distance', this.value + 'px');
        localStorage.setItem('frame-distance', this.value);
    });

    // Frame radius control
    frameRadius.addEventListener('input', function () {
        document.body.style.setProperty('--frame-radius', this.value + 'px');
        localStorage.setItem('frame-radius', this.value);
    });

    // Frame opacity control
    frameOpacity.addEventListener('input', function () {
        const opacity = parseFloat(this.value);
        document.body.style.setProperty('--frame-opacity', opacity);
        frameOpacityValue.textContent = opacity.toFixed(2);
        localStorage.setItem('frame-opacity', opacity);
    });

    // Frame style control
    frameStyle.addEventListener('change', function () {
        document.body.style.setProperty('--frame-style', this.value);
        localStorage.setItem('frame-style', this.value);
    });

    // Frame color buttons
    frameColorButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            document.body.style.setProperty('--frame-color', color);
            localStorage.setItem('frame-color', color);

            // Visual feedback: highlight selected button
            frameColorButtons.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Highlight the currently selected color on load
    if (savedFrameColor) {
        frameColorButtons.forEach((button) => {
            if (button.getAttribute('data-color') === savedFrameColor) {
                button.classList.add('active');
            }
        });
    }
});
