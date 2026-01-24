// Gradient controls functionality
const gradientColorPicker = document.querySelector('.gradient-color-picker');
const gradientColorButtons = document.querySelectorAll('.gradient-color-btn');
const gradientInnerOpacity = document.getElementById('gradient-inner-opacity');
const gradientOuterOpacity = document.getElementById('gradient-outer-opacity');
const gradientInnerPercent = document.getElementById('gradient-inner-percent');
const gradientOuterPercent = document.getElementById('gradient-outer-percent');

const innerOpacityValue = document.getElementById('inner-opacity-value');
const outerOpacityValue = document.getElementById('outer-opacity-value');
const innerPercentValue = document.getElementById('inner-percent-value');
const outerPercentValue = document.getElementById('outer-percent-value');

let currentGradientColor = '#000000';

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}

// Update active gradient color button state
function updateActiveGradientButton(color) {
    const group = document.querySelector('[data-gradient="color"]');
    if (group) {
        group
            .querySelectorAll('.gradient-color-btn, .gradient-color-picker')
            .forEach((btn) => {
                btn.classList.remove('active');
            });

        const matchingBtn = group.querySelector(
            `.gradient-color-btn[data-color="${color}"]`
        );
        if (matchingBtn) {
            matchingBtn.classList.add('active');
        } else {
            if (gradientColorPicker) {
                gradientColorPicker.classList.add('active');
            }
        }
    }
}

// Apply gradient settings
function applyGradientSettings() {
    const rgb = hexToRgb(currentGradientColor);
    if (rgb) {
        document.body.style.setProperty('--gradient-color-r', rgb.r);
        document.body.style.setProperty('--gradient-color-g', rgb.g);
        document.body.style.setProperty('--gradient-color-b', rgb.b);
    }
    document.body.style.setProperty(
        '--gradient-inner-opacity',
        gradientInnerOpacity.value
    );
    document.body.style.setProperty(
        '--gradient-outer-opacity',
        gradientOuterOpacity.value
    );
    document.body.style.setProperty(
        '--gradient-inner-percent',
        gradientInnerPercent.value + '%'
    );
    document.body.style.setProperty(
        '--gradient-outer-percent',
        gradientOuterPercent.value + '%'
    );

    // Update value displays
    innerOpacityValue.textContent = gradientInnerOpacity.value;
    outerOpacityValue.textContent = gradientOuterOpacity.value;
    innerPercentValue.textContent = gradientInnerPercent.value + '%';
    outerPercentValue.textContent = gradientOuterPercent.value + '%';

    // Save to localStorage
    const gradientSettings = {
        color: currentGradientColor,
        innerOpacity: gradientInnerOpacity.value,
        outerOpacity: gradientOuterOpacity.value,
        innerPercent: gradientInnerPercent.value,
        outerPercent: gradientOuterPercent.value
    };
    localStorage.setItem('gradientSettings', JSON.stringify(gradientSettings));
}

// Load saved gradient settings
const savedGradient = JSON.parse(
    localStorage.getItem('gradientSettings') || '{}'
);

if (savedGradient.color) {
    currentGradientColor = savedGradient.color;
    if (gradientColorPicker) {
        gradientColorPicker.value = savedGradient.color;
    }
    gradientInnerOpacity.value = savedGradient.innerOpacity || 0;
    gradientOuterOpacity.value = savedGradient.outerOpacity || 0.7;
    gradientInnerPercent.value = savedGradient.innerPercent || 30;
    gradientOuterPercent.value = savedGradient.outerPercent || 100;
    updateActiveGradientButton(currentGradientColor);
    applyGradientSettings();
} else {
    // Initialize with first predefined color
    const firstGradientBtn = document.querySelector('.gradient-color-btn');
    if (firstGradientBtn) {
        currentGradientColor = firstGradientBtn.dataset.color;
        if (gradientColorPicker) {
            gradientColorPicker.value = currentGradientColor;
        }
    }
    updateActiveGradientButton(currentGradientColor);
    applyGradientSettings();
}

// Gradient color picker handler
if (gradientColorPicker) {
    gradientColorPicker.addEventListener('input', function () {
        currentGradientColor = this.value;
        updateActiveGradientButton(currentGradientColor);
        applyGradientSettings();
    });
}

// Gradient color button handlers
gradientColorButtons.forEach((button) => {
    button.addEventListener('click', function () {
        currentGradientColor = this.dataset.color;
        if (gradientColorPicker) {
            gradientColorPicker.value = currentGradientColor;
        }
        updateActiveGradientButton(currentGradientColor);
        applyGradientSettings();
    });
});

// Event listeners for gradient controls
gradientInnerOpacity.addEventListener('input', applyGradientSettings);
gradientOuterOpacity.addEventListener('input', applyGradientSettings);
gradientInnerPercent.addEventListener('input', applyGradientSettings);
gradientOuterPercent.addEventListener('input', applyGradientSettings);
