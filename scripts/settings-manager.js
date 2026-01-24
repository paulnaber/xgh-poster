// Settings Manager - Handle Edit, Reset, and Save functionality

document.addEventListener('DOMContentLoaded', function () {
    const editBtn = document.getElementById('edit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hideControlsBtn = document.getElementById('hide-controls-btn');
    const modal = document.getElementById('css-modal');
    const modalClose = document.querySelector('.modal-close');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const copyCssBtn = document.getElementById('copy-css-btn');
    const applyCssBtn = document.getElementById('apply-css-btn');
    const cssPropertiesTextarea = document.getElementById('css-properties');

    // List of all CSS custom properties to track
    const cssProperties = [
        '--black',
        '--white',
        '--headline-xgh',
        '--highlight',
        '--white-translucent',
        '--width',
        '--height',
        '--gradient-color-r',
        '--gradient-color-g',
        '--gradient-color-b',
        '--gradient-inner-opacity',
        '--gradient-outer-opacity',
        '--gradient-inner-percent',
        '--gradient-outer-percent',
        '--headline-font',
        '--headline-size',
        '--axiom-number-font',
        '--axiom-number-size',
        '--body-font',
        '--body-size',
        '--zoom-scale',
        '--icon-filter',
        '--icon-opacity',
        '--background-image',
        '--poster-padding-top',
        '--poster-padding-right',
        '--poster-padding-bottom',
        '--poster-padding-left',
        '--icon-size',
        '--headline-margin',
        '--axiom-gap-row',
        '--axiom-gap-column',
        '--axiom-text-offset',
        '--axiom-gap',
        '--axiom-grid-column-2',
        '--axioms-grid-columns',
        '--axioms-column-flow',
        '--frame-enabled',
        '--frame-thickness',
        '--frame-color',
        '--frame-distance',
        '--frame-radius',
        '--frame-opacity',
        '--frame-style'
    ];

    // Get default values from defaults.css
    function getDefaultProperties() {
        // Create a temporary element to get the default styles
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        // Remove all inline styles temporarily
        const currentStyles = document.body.style.cssText;
        document.body.style.cssText = '';

        const computedStyles = getComputedStyle(document.body);
        const defaults = {};

        cssProperties.forEach((prop) => {
            defaults[prop] = computedStyles.getPropertyValue(prop).trim();
        });

        // Restore inline styles
        document.body.style.cssText = currentStyles;
        document.body.removeChild(tempDiv);

        return defaults;
    }

    // Get current CSS custom properties
    function getCurrentProperties() {
        const bodyStyles = getComputedStyle(document.body);
        const properties = {};

        cssProperties.forEach((prop) => {
            const value = bodyStyles.getPropertyValue(prop).trim();
            if (value) {
                properties[prop] = value;
            }
        });

        return properties;
    }

    // Format properties as CSS
    function formatPropertiesAsCSS(properties) {
        let css = 'body {\n';
        Object.keys(properties)
            .sort()
            .forEach((prop) => {
                css += `    ${prop}: ${properties[prop]};\n`;
            });
        css += '}';
        return css;
    }

    // Sync UI controls with current CSS properties
    function syncUIControls() {
        console.log('Syncing UI controls with CSS properties...');
        const bodyStyles = getComputedStyle(document.body);

        // Helper to parse pixel values
        const parsePx = (value) => parseInt(value) || 0;
        const parseNumber = (value) => parseFloat(value) || 0;

        // Font controls
        const headlineFont = document.getElementById('headline-font');
        const headlineSize = document.getElementById('headline-size');
        const axiomNumberFont = document.getElementById('axiom-number-font');
        const axiomNumberSize = document.getElementById('axiom-number-size');
        const bodyFont = document.getElementById('body-font');
        const bodySize = document.getElementById('body-size');

        if (headlineFont)
            headlineFont.value = bodyStyles
                .getPropertyValue('--headline-font')
                .trim();
        if (headlineSize)
            headlineSize.value = parsePx(
                bodyStyles.getPropertyValue('--headline-size')
            );
        if (axiomNumberFont)
            axiomNumberFont.value = bodyStyles
                .getPropertyValue('--axiom-number-font')
                .trim();
        if (axiomNumberSize)
            axiomNumberSize.value = parsePx(
                bodyStyles.getPropertyValue('--axiom-number-size')
            );
        if (bodyFont)
            bodyFont.value = bodyStyles.getPropertyValue('--body-font').trim();
        if (bodySize)
            bodySize.value = parsePx(
                bodyStyles.getPropertyValue('--body-size')
            );

        // Layout controls
        const posterPaddingTop = document.getElementById('poster-padding-top');
        const posterPaddingRight = document.getElementById(
            'poster-padding-right'
        );
        const posterPaddingBottom = document.getElementById(
            'poster-padding-bottom'
        );
        const posterPaddingLeft = document.getElementById(
            'poster-padding-left'
        );
        const iconSize = document.getElementById('icon-size');
        const headlineMargin = document.getElementById('headline-margin');
        const axiomsColumnFlow = document.getElementById('axioms-column-flow');
        const axiomsGridColumns = document.getElementById(
            'axioms-grid-columns'
        );
        const axiomGapRow = document.getElementById('axiom-gap-row');
        const axiomGapColumn = document.getElementById('axiom-gap-column');
        const axiomGap = document.getElementById('axiom-gap');
        const axiomTextOffset = document.getElementById('axiom-text-offset');

        if (posterPaddingTop)
            posterPaddingTop.value = parsePx(
                bodyStyles.getPropertyValue('--poster-padding-top')
            );
        if (posterPaddingRight)
            posterPaddingRight.value = parsePx(
                bodyStyles.getPropertyValue('--poster-padding-right')
            );
        if (posterPaddingBottom)
            posterPaddingBottom.value = parsePx(
                bodyStyles.getPropertyValue('--poster-padding-bottom')
            );
        if (posterPaddingLeft)
            posterPaddingLeft.value = parsePx(
                bodyStyles.getPropertyValue('--poster-padding-left')
            );
        if (iconSize)
            iconSize.value = parsePx(
                bodyStyles.getPropertyValue('--icon-size')
            );
        if (headlineMargin)
            headlineMargin.value = parsePx(
                bodyStyles.getPropertyValue('--headline-margin')
            );
        if (axiomsColumnFlow)
            axiomsColumnFlow.checked =
                bodyStyles.getPropertyValue('--axioms-column-flow').trim() ===
                'true';
        if (axiomsGridColumns)
            axiomsGridColumns.value = bodyStyles
                .getPropertyValue('--axioms-grid-columns')
                .trim();
        if (axiomGapRow)
            axiomGapRow.value = parsePx(
                bodyStyles.getPropertyValue('--axiom-gap-row')
            );
        if (axiomGapColumn)
            axiomGapColumn.value = parsePx(
                bodyStyles.getPropertyValue('--axiom-gap-column')
            );
        if (axiomGap)
            axiomGap.value = parsePx(
                bodyStyles.getPropertyValue('--axiom-gap')
            );
        if (axiomTextOffset)
            axiomTextOffset.value = parsePx(
                bodyStyles.getPropertyValue('--axiom-text-offset')
            );

        // Gradient controls
        const gradientColor = document.getElementById('gradient-color');
        const gradientInnerOpacity = document.getElementById(
            'gradient-inner-opacity'
        );
        const gradientOuterOpacity = document.getElementById(
            'gradient-outer-opacity'
        );
        const gradientInnerPercent = document.getElementById(
            'gradient-inner-percent'
        );
        const gradientOuterPercent = document.getElementById(
            'gradient-outer-percent'
        );

        if (gradientColor) {
            const r = bodyStyles.getPropertyValue('--gradient-color-r').trim();
            const g = bodyStyles.getPropertyValue('--gradient-color-g').trim();
            const b = bodyStyles.getPropertyValue('--gradient-color-b').trim();
            gradientColor.value =
                '#' +
                [r, g, b]
                    .map((x) => parseInt(x).toString(16).padStart(2, '0'))
                    .join('');
        }
        if (gradientInnerOpacity) {
            gradientInnerOpacity.value = parseNumber(
                bodyStyles.getPropertyValue('--gradient-inner-opacity')
            );
            const display = document.getElementById('inner-opacity-value');
            if (display) display.textContent = gradientInnerOpacity.value;
        }
        if (gradientOuterOpacity) {
            gradientOuterOpacity.value = parseNumber(
                bodyStyles.getPropertyValue('--gradient-outer-opacity')
            );
            const display = document.getElementById('outer-opacity-value');
            if (display) display.textContent = gradientOuterOpacity.value;
        }
        if (gradientInnerPercent) {
            gradientInnerPercent.value = parsePx(
                bodyStyles.getPropertyValue('--gradient-inner-percent')
            );
            const display = document.getElementById('inner-percent-value');
            if (display) display.textContent = gradientInnerPercent.value + '%';
        }
        if (gradientOuterPercent) {
            gradientOuterPercent.value = parsePx(
                bodyStyles.getPropertyValue('--gradient-outer-percent')
            );
            const display = document.getElementById('outer-percent-value');
            if (display) display.textContent = gradientOuterPercent.value + '%';
        }

        // Frame controls
        const frameEnabled = document.getElementById('frame-enabled');
        const frameThickness = document.getElementById('frame-thickness');
        const frameDistance = document.getElementById('frame-distance');
        const frameRadius = document.getElementById('frame-radius');
        const frameOpacity = document.getElementById('frame-opacity');
        const frameStyle = document.getElementById('frame-style');

        if (frameEnabled)
            frameEnabled.checked =
                bodyStyles.getPropertyValue('--frame-enabled').trim() === '1';
        if (frameThickness)
            frameThickness.value = parsePx(
                bodyStyles.getPropertyValue('--frame-thickness')
            );
        if (frameDistance)
            frameDistance.value = parsePx(
                bodyStyles.getPropertyValue('--frame-distance')
            );
        if (frameRadius)
            frameRadius.value = parsePx(
                bodyStyles.getPropertyValue('--frame-radius')
            );
        if (frameOpacity) {
            frameOpacity.value = parseNumber(
                bodyStyles.getPropertyValue('--frame-opacity')
            );
            const display = document.getElementById('frame-opacity-value');
            if (display) display.textContent = frameOpacity.value.toFixed(2);
        }
        if (frameStyle)
            frameStyle.value = bodyStyles
                .getPropertyValue('--frame-style')
                .trim();

        // Background selector
        const backgroundSelector = document.getElementById(
            'background-selector'
        );
        if (backgroundSelector) {
            backgroundSelector.value = bodyStyles
                .getPropertyValue('--background-image')
                .trim();
        }
        zoomSlider = document.getElementById('zoom-slider');
        if (zoomSlider) {
            const zoomScale = parseNumber(
                bodyStyles.getPropertyValue('--zoom-scale')
            );
            zoomSlider.value = Math.round(zoomScale * 100);
            const display = document.querySelector('.zoom-value');
            if (display) display.textContent = zoomSlider.value + '%';
        }

        console.log('UI controls synced successfully');
    }

    // Listen for custom sync event
    document.addEventListener('syncUIControls', syncUIControls);

    // Parse CSS from textarea and apply to body
    function parseCSSAndApply(cssText) {
        try {
            // Extract property declarations from the CSS
            const propertyPattern = /--([\w-]+)\s*:\s*([^;]+);/g;
            let match;
            const newProperties = {};

            while ((match = propertyPattern.exec(cssText)) !== null) {
                const propName = '--' + match[1];
                const propValue = match[2].trim();
                newProperties[propName] = propValue;
            }

            // Apply properties to body
            Object.keys(newProperties).forEach((prop) => {
                document.body.style.setProperty(prop, newProperties[prop]);
            });

            // Save to localStorage
            localStorage.setItem(
                'customCSSProperties',
                JSON.stringify(newProperties)
            );

            // Sync UI controls to reflect the changes
            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                setTimeout(() => {
                    syncUIControls();
                }, 50);
            });

            return true;
        } catch (error) {
            console.error('Error parsing CSS:', error);
            alert('Error parsing CSS. Please check the format.');
            return false;
        }
    }

    // Open modal and show current properties
    function openModal(editable = false) {
        const properties = getCurrentProperties();
        const cssText = formatPropertiesAsCSS(properties);
        cssPropertiesTextarea.value = cssText;
        cssPropertiesTextarea.readOnly = !editable;

        if (editable) {
            cssPropertiesTextarea.style.backgroundColor = 'white';
            applyCssBtn.style.display = 'inline-block';
        } else {
            cssPropertiesTextarea.style.backgroundColor = '#f5f5f5';
            applyCssBtn.style.display = 'none';
        }

        modal.classList.add('show');
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
    }

    // Edit button - Opens modal in editable mode
    editBtn.addEventListener('click', function () {
        openModal(true);
    });

    // Reset button - Reset to defaults from defaults.css
    resetBtn.addEventListener('click', function () {
        if (
            confirm(
                'Are you sure you want to reset all settings to their default values?'
            )
        ) {
            // Clear localStorage
            localStorage.clear();

            // Remove all inline styles from body
            cssProperties.forEach((prop) => {
                document.body.style.removeProperty(prop);
            });

            // Reload the page to reinitialize everything
            location.reload();
        }
    });

    // Copy to clipboard button
    copyCssBtn.addEventListener('click', function () {
        cssPropertiesTextarea.select();
        navigator.clipboard
            .writeText(cssPropertiesTextarea.value)
            .then(() => {
                const originalText = copyCssBtn.textContent;
                copyCssBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyCssBtn.textContent = originalText;
                }, 2000);
            })
            .catch((err) => {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            });
    });

    // Apply button
    applyCssBtn.addEventListener('click', function () {
        const success = parseCSSAndApply(cssPropertiesTextarea.value);
        if (success) {
            const originalText = applyCssBtn.textContent;
            applyCssBtn.textContent = 'Applied!';
            setTimeout(() => {
                applyCssBtn.textContent = originalText;
                closeModal();
                // Reload to apply all changes consistently
                location.reload();
            }, 1000);
        }
    });

    // Close modal button
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal on X click
    modalClose.addEventListener('click', closeModal);

    // Close modal on outside click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Hide all controls button
    if (hideControlsBtn) {
        hideControlsBtn.addEventListener('click', function () {
            const allPanels = document.querySelectorAll('.control-panel');
            allPanels.forEach((panel) => {
                panel.style.display = 'none';
            });
        });
    }

    // Load saved properties on page load
    const savedProperties = localStorage.getItem('customCSSProperties');
    if (savedProperties) {
        try {
            const properties = JSON.parse(savedProperties);
            Object.keys(properties).forEach((prop) => {
                document.body.style.setProperty(prop, properties[prop]);
            });
            // Sync UI controls after loading saved properties
            // Use a small delay to ensure all DOM elements are ready
            setTimeout(() => {
                syncUIControls();
            }, 100);
        } catch (error) {
            console.error('Error loading saved properties:', error);
        }
    }
});

// Expose syncUIControls globally so other scripts can use it if needed
window.syncUIControls = function () {
    // Trigger the sync from the settings-manager scope
    const event = new CustomEvent('syncUIControls');
    document.dispatchEvent(event);
};
