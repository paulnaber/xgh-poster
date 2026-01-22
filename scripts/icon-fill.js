// Icon fill functionality
const iconFillButtons = document.querySelectorAll('.icon-fill-btn');

// Load saved icon filter from localStorage
const savedFilter = localStorage.getItem('iconFilter');
if (savedFilter) {
    applyIconFilter(savedFilter);
    updateActiveIconButton(savedFilter);
}

// Update active icon button state
function updateActiveIconButton(filter) {
    iconFillButtons.forEach((btn) => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
}

// Apply icon filter using CSS custom properties
function applyIconFilter(filter) {
    if (filter === 'none') {
        document.body.style.setProperty('--icon-filter', 'none');
        document.body.style.setProperty('--icon-opacity', '1');
    } else {
        document.body.style.setProperty('--icon-filter', filter);
        const opacity = filter.includes('155deg') ? '0.72' : '0.7';
        document.body.style.setProperty('--icon-opacity', opacity);
    }
}

// Icon fill button click handler
iconFillButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const filter = this.dataset.filter;

        // Update logo filter using custom properties
        applyIconFilter(filter);

        // Update active state
        updateActiveIconButton(filter);

        // Save to localStorage
        localStorage.setItem('iconFilter', filter);
    });
});
