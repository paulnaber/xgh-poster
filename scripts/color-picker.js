// Color picker functionality
const colorButtons = document.querySelectorAll('.color-btn');
const colorPickerInputs = document.querySelectorAll('.color-picker-input');

// Initialize defaults on first load
function initializeDefaults() {
    const savedColors = JSON.parse(
        localStorage.getItem('customColors') || '{}'
    );

    // If no saved colors, set defaults from the first predefined button in each group
    if (Object.keys(savedColors).length === 0) {
        document
            .querySelectorAll('.color-options[data-property]')
            .forEach((group) => {
                const property = group.dataset.property;
                const firstButton = group.querySelector('.color-btn');
                if (firstButton) {
                    const defaultColor = firstButton.dataset.color;
                    document.body.style.setProperty(property, defaultColor);
                    savedColors[property] = defaultColor;
                }
            });
        localStorage.setItem('customColors', JSON.stringify(savedColors));
    }
}

// Load saved colors from localStorage
initializeDefaults();
const savedColors = JSON.parse(localStorage.getItem('customColors') || '{}');
Object.entries(savedColors).forEach(([property, color]) => {
    document.body.style.setProperty(property, color);
    updateActiveButton(property, color);
});

// Update active button state
function updateActiveButton(property, color) {
    const group = document.querySelector(`[data-property="${property}"]`);
    if (group) {
        // Remove active from all buttons and pickers in this group
        group
            .querySelectorAll('.color-btn, .color-picker-input')
            .forEach((btn) => {
                btn.classList.remove('active');
            });

        // Check if the color matches a predefined button
        const matchingBtn = group.querySelector(
            `.color-btn[data-color="${color}"]`
        );
        if (matchingBtn) {
            matchingBtn.classList.add('active');
        } else {
            // If no match, mark the picker as active
            const picker = group.querySelector('.color-picker-input');
            if (picker) {
                picker.classList.add('active');
            }
        }
    }
}

// Color button click handler
colorButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const color = this.dataset.color;
        const property = this.parentElement.dataset.property;

        // Update CSS custom property
        document.body.style.setProperty(property, color);

        // Update active state
        updateActiveButton(property, color);

        // Save to localStorage
        const colors = JSON.parse(localStorage.getItem('customColors') || '{}');
        colors[property] = color;
        localStorage.setItem('customColors', JSON.stringify(colors));
    });
});

// Color picker input handler
colorPickerInputs.forEach((picker) => {
    picker.addEventListener('input', function () {
        const color = this.value;
        const property = this.parentElement.dataset.property;

        // Update CSS custom property
        document.body.style.setProperty(property, color);

        // Update active state
        updateActiveButton(property, color);

        // Save to localStorage
        const colors = JSON.parse(localStorage.getItem('customColors') || '{}');
        colors[property] = color;
        localStorage.setItem('customColors', JSON.stringify(colors));
    });
});
