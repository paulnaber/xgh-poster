// Settings Manager - Handle Edit, Reset, and Save functionality

document.addEventListener('DOMContentLoaded', function () {
    const editBtn = document.getElementById('edit-btn');
    const resetBtn = document.getElementById('reset-btn');
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
        '--axioms-grid-columns'
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

    // Load saved properties on page load
    const savedProperties = localStorage.getItem('customCSSProperties');
    if (savedProperties) {
        try {
            const properties = JSON.parse(savedProperties);
            Object.keys(properties).forEach((prop) => {
                document.body.style.setProperty(prop, properties[prop]);
            });
        } catch (error) {
            console.error('Error loading saved properties:', error);
        }
    }
});
