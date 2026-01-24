// Icon fill functionality
const iconFillButtons = document.querySelectorAll('.icon-fill-btn');
const iconColorPicker = document.querySelector('.icon-color-picker');

// Load saved icon color from localStorage or use default (first predefined color)
let savedIconColor = localStorage.getItem('iconColor');
if (!savedIconColor) {
    // Set default to first predefined color
    const firstIconBtn = document.querySelector('.icon-fill-btn');
    savedIconColor = firstIconBtn ? firstIconBtn.dataset.color : '#fffb00';
    localStorage.setItem('iconColor', savedIconColor);
}

applyIconColor(savedIconColor);
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

// Apply icon color using CSS custom property
function applyIconColor(color) {
    document.body.style.setProperty('--icon-color', color);
}

// Icon fill button click handler
iconFillButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const color = this.dataset.color;

        // Update icon color
        applyIconColor(color);

        // Update active state
        updateActiveIconButton(color);

        // Save to localStorage
        localStorage.setItem('iconColor', color);
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
