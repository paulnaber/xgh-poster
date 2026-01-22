// Gradient controls functionality
const gradientColor = document.getElementById('gradient-color');
const gradientInnerOpacity = document.getElementById('gradient-inner-opacity');
const gradientOuterOpacity = document.getElementById('gradient-outer-opacity');
const gradientInnerPercent = document.getElementById('gradient-inner-percent');
const gradientOuterPercent = document.getElementById('gradient-outer-percent');

const innerOpacityValue = document.getElementById('inner-opacity-value');
const outerOpacityValue = document.getElementById('outer-opacity-value');
const innerPercentValue = document.getElementById('inner-percent-value');
const outerPercentValue = document.getElementById('outer-percent-value');

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

// Apply gradient settings
function applyGradientSettings() {
    const rgb = hexToRgb(gradientColor.value);
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
        color: gradientColor.value,
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
    gradientColor.value = savedGradient.color;
    gradientInnerOpacity.value = savedGradient.innerOpacity || 0;
    gradientOuterOpacity.value = savedGradient.outerOpacity || 0.7;
    gradientInnerPercent.value = savedGradient.innerPercent || 30;
    gradientOuterPercent.value = savedGradient.outerPercent || 100;
    applyGradientSettings();
}

// Event listeners for gradient controls
gradientColor.addEventListener('input', applyGradientSettings);
gradientInnerOpacity.addEventListener('input', applyGradientSettings);
gradientOuterOpacity.addEventListener('input', applyGradientSettings);
gradientInnerPercent.addEventListener('input', applyGradientSettings);
gradientOuterPercent.addEventListener('input', applyGradientSettings);
