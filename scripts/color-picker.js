// Color picker functionality
const colorButtons = document.querySelectorAll('.color-btn');

// Load saved colors from localStorage
const savedColors = JSON.parse(localStorage.getItem('customColors') || '{}');
Object.entries(savedColors).forEach(([property, color]) => {
    document.body.style.setProperty(property, color);
    updateActiveButton(property, color);
});

// Update active button state
function updateActiveButton(property, color) {
    const group = document.querySelector(`[data-property="${property}"]`);
    if (group) {
        group.querySelectorAll('.color-btn').forEach((btn) => {
            btn.classList.remove('active');
            if (btn.dataset.color === color) {
                btn.classList.add('active');
            }
        });
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
