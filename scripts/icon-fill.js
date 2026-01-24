// Icon fill functionality
const iconFillButtons = document.querySelectorAll('.icon-fill-btn');
const iconColorPicker = document.querySelector('.icon-color-picker');

// Load saved icon color from localStorage or use default (first predefined color)
let savedIconColor = localStorage.getItem('iconColor');
let savedIconFilter = localStorage.getItem('iconFilter');

if (!savedIconColor) {
    // Get default from CSS
    const bodyStyles = getComputedStyle(document.body);
    savedIconColor =
        bodyStyles.getPropertyValue('--icon-color').trim() || '#ffffff';
}

if (savedIconFilter) {
    document.body.style.setProperty('--icon-filter', savedIconFilter);
} else {
    applyIconColor(savedIconColor);
}

document.body.style.setProperty('--icon-color', savedIconColor);
updateActiveIconButton(savedIconColor);
if (iconColorPicker) {
    iconColorPicker.value = savedIconColor;
}

// Update active icon button state
function updateActiveIconButton(color) {
    // Remove active from all buttons and picker
    const group = document.querySelector('[data-target="icon"]');
    if (group) {
        group
            .querySelectorAll('.icon-fill-btn, .icon-color-picker')
            .forEach((btn) => {
                btn.classList.remove('active');
            });

        // Check if the color matches a predefined button
        const matchingBtn = group.querySelector(
            `.icon-fill-btn[data-color="${color}"]`
        );
        if (matchingBtn) {
            matchingBtn.classList.add('active');
        } else {
            // If no match, mark the picker as active
            if (iconColorPicker) {
                iconColorPicker.classList.add('active');
            }
        }
    }
}

// Apply icon color using CSS filter to colorize the image
function applyIconColor(color) {
    document.body.style.setProperty('--icon-color', color);

    // Convert hex color to HSL for filter generation
    const filter = hexToFilter(color);
    document.body.style.setProperty('--icon-filter', filter);
}

// Convert hex color to CSS filter that approximates the color
function hexToFilter(hex) {
    // Remove # if present
    hex = hex.replace('#', '');

    // Convert to RGB (0-255)
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // For white or near-white
    if (r > 230 && g > 230 && b > 230) {
        return 'brightness(0) invert(1)';
    }

    // For black or near-black
    if (r < 25 && g < 25 && b < 25) {
        return 'brightness(0)';
    }

    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
        if (max === rNorm) {
            hue = ((gNorm - bNorm) / delta) % 6;
        } else if (max === gNorm) {
            hue = (bNorm - rNorm) / delta + 2;
        } else {
            hue = (rNorm - gNorm) / delta + 4;
        }
        hue = Math.round(hue * 60);
        if (hue < 0) hue += 360;
    }

    const lightness = (max + min) / 2;
    const saturation =
        delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    // Build filter chain to transform from base yellow (#fffb00) to target color
    // Base yellow has hue ~60deg
    const hueRotate = hue - 60;

    // Adjust saturation (base is already quite saturated)
    const saturateValue = Math.max(1, saturation * 10);

    // Adjust brightness based on lightness
    const brightnessValue = lightness * 2;

    // Use sepia as base for color transformation
    return `brightness(${brightnessValue}) sepia(1) saturate(${saturateValue}) hue-rotate(${hueRotate}deg)`;
}

// Icon fill button click handler
iconFillButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const color = this.dataset.color;
        const filter = this.dataset.filter;

        // Apply the predefined filter
        document.body.style.setProperty('--icon-filter', filter);
        document.body.style.setProperty('--icon-color', color);

        // Update active state
        updateActiveIconButton(color);

        // Save to localStorage
        localStorage.setItem('iconColor', color);
        localStorage.setItem('iconFilter', filter);
    });
});

// Icon color picker handler
if (iconColorPicker) {
    iconColorPicker.addEventListener('input', function () {
        const color = this.value;

        // Update icon color
        applyIconColor(color);

        // Update active state
        updateActiveIconButton(color);

        // Save to localStorage
        localStorage.setItem('iconColor', color);
    });
}

// Icon opacity slider
const iconOpacity = document.getElementById('icon-opacity');
const iconOpacityValue = document.getElementById('icon-opacity-value');

if (iconOpacity && iconOpacityValue) {
    // Load saved opacity from localStorage or use default
    const savedOpacity = localStorage.getItem('icon-opacity');
    const currentOpacity =
        savedOpacity ||
        getComputedStyle(document.body)
            .getPropertyValue('--icon-opacity')
            .trim() ||
        '0.8';

    // Set the slider to match current value
    iconOpacity.value = currentOpacity;
    iconOpacityValue.textContent = parseFloat(currentOpacity).toFixed(2);
    document.body.style.setProperty('--icon-opacity', currentOpacity);

    // Listen for opacity changes
    iconOpacity.addEventListener('input', function () {
        const opacity = this.value;
        document.body.style.setProperty('--icon-opacity', opacity);
        iconOpacityValue.textContent = parseFloat(opacity).toFixed(2);
        localStorage.setItem('icon-opacity', opacity);
    });
}
