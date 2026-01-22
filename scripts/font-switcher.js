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
        const headline = document.querySelector('header h1');
        if (headline) {
            headline.style.fontFamily = selectedFont;
        }
    });

    // Apply headline size
    headlineSize.addEventListener('input', function () {
        const size = this.value;
        const headline = document.querySelector('header h1');
        if (headline) {
            headline.style.fontSize = size + 'px';
        }
    });

    // Apply axiom number font
    axiomNumberFont.addEventListener('change', function () {
        const selectedFont = this.value;
        const axiomNumbers = document.querySelectorAll('.axiom h2');
        axiomNumbers.forEach((number) => {
            number.style.fontFamily = selectedFont;
        });
    });

    // Apply axiom number size
    axiomNumberSize.addEventListener('input', function () {
        const size = this.value;
        const axiomNumbers = document.querySelectorAll('.axiom h2');
        axiomNumbers.forEach((number) => {
            number.style.fontSize = size + 'pt';
        });
    });

    // Apply body text font
    bodyFont.addEventListener('change', function () {
        const selectedFont = this.value;
        const axiomTexts = document.querySelectorAll('.axiom p');
        axiomTexts.forEach((text) => {
            text.style.fontFamily = selectedFont;
        });
    });

    // Apply body text size
    bodySize.addEventListener('input', function () {
        const size = this.value;
        const axiomTexts = document.querySelectorAll('.axiom p');
        axiomTexts.forEach((text) => {
            text.style.fontSize = size + 'pt';
        });
    });
});
