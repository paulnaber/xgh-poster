// Style switcher functionality
const styleSelector = document.getElementById('style-selector');
const stylesheet = document.getElementById('stylesheet');

// Load saved preference from localStorage
const savedStyle = localStorage.getItem('selectedStyle');
if (savedStyle) {
    stylesheet.href = savedStyle;
    styleSelector.value = savedStyle;
} else {
    // Set default style on first load
    const defaultStyle = 'styles/layout-1.css';
    stylesheet.href = defaultStyle;
    styleSelector.value = defaultStyle;
}

// Switch stylesheet on change
styleSelector.addEventListener('change', function () {
    const newStyle = this.value;
    stylesheet.href = newStyle;
    localStorage.setItem('selectedStyle', newStyle);
});
