// Panel toggle functionality with dynamic positioning
const panels = document.querySelectorAll('.control-panel');

// Calculate panel positions based on expanded/collapsed state
function updatePanelPositions() {
    let currentTop = 20; // Start position
    const gap = 10; // Gap between panels

    panels.forEach((panel) => {
        panel.style.top = currentTop + 'px';

        // Get actual height of the panel
        const height = panel.offsetHeight;
        currentTop += height + gap;
    });
}

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

        // Update positions after state change
        // Use setTimeout to allow CSS transition to update height
        setTimeout(updatePanelPositions, 10);
    });
});

// Initial position calculation
setTimeout(updatePanelPositions, 10);
