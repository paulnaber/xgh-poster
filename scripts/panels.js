// Panel toggle functionality
const panels = document.querySelectorAll('.control-panel');

// Clear any old inline positioning styles
panels.forEach((panel) => {
    panel.style.top = '';
    panel.style.position = '';
});

panels.forEach((panel) => {
    const header = panel.querySelector('.panel-header');
    const panelClass = panel.classList[0]; // Get the first class (css-switcher, zoom-controls, etc.)

    // Load saved state from localStorage (except zoom which is always visible)
    if (panelClass !== 'zoom-controls') {
        const isCollapsed = localStorage.getItem(
            `panel-${panelClass}-collapsed`
        );
        if (isCollapsed === 'false') {
            panel.classList.remove('collapsed');
        }
    }

    header.addEventListener('click', () => {
        // Don't allow zoom to be collapsed
        if (panelClass === 'zoom-controls') {
            return;
        }

        panel.classList.toggle('collapsed');
        // Save state to localStorage
        localStorage.setItem(
            `panel-${panelClass}-collapsed`,
            panel.classList.contains('collapsed')
        );
    });
});
