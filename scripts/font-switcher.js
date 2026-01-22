// Font switcher functionality
document.addEventListener('DOMContentLoaded', function () {
    const headlineFont = document.getElementById('headline-font');
    const headlineSize = document.getElementById('headline-size');
    const axiomNumberFont = document.getElementById('axiom-number-font');
    const axiomNumberSize = document.getElementById('axiom-number-size');
    const bodyFont = document.getElementById('body-font');
    const bodySize = document.getElementById('body-size');

    // Apply headline font
    headlineFont.addEventListener('change', function () {
        const selectedFont = this.value;
        document.body.style.setProperty('--headline-font', selectedFont);
    });

    // Apply headline size
    headlineSize.addEventListener('input', function () {
        const size = this.value;
        document.body.style.setProperty('--headline-size', size + 'px');
    });

    // Apply axiom number font
    axiomNumberFont.addEventListener('change', function () {
        const selectedFont = this.value;
        document.body.style.setProperty('--axiom-number-font', selectedFont);
    });

    // Apply axiom number size
    axiomNumberSize.addEventListener('input', function () {
        const size = this.value;
        document.body.style.setProperty('--axiom-number-size', size + 'pt');
    });

    // Apply body text font
    bodyFont.addEventListener('change', function () {
        const selectedFont = this.value;
        document.body.style.setProperty('--body-font', selectedFont);
    });

    // Apply body text size
    bodySize.addEventListener('input', function () {
        const size = this.value;
        document.body.style.setProperty('--body-size', size + 'pt');
    });
});
