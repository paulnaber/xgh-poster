// Icon fill functionality
const iconFillButtons = document.querySelectorAll('.icon-fill-btn');
const logoImage = document.querySelector('.logo');

// Load saved icon filter from localStorage
const savedFilter = localStorage.getItem('iconFilter');
if (savedFilter) {
    logoImage.style.filter = savedFilter;
    if (savedFilter !== 'none') {
        logoImage.style.opacity = savedFilter.includes('155deg')
            ? '0.72'
            : '0.7';
    }
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

// Icon fill button click handler
iconFillButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const filter = this.dataset.filter;

        // Update logo filter
        if (filter === 'none') {
            logoImage.style.filter = 'none';
            logoImage.style.opacity = '1';
        } else {
            logoImage.style.filter = filter;
            logoImage.style.opacity = filter.includes('155deg')
                ? '0.72'
                : '0.7';
        }

        // Update active state
        updateActiveIconButton(filter);

        // Save to localStorage
        localStorage.setItem('iconFilter', filter);
    });
});
