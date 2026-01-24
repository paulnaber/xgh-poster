# Development Patterns

> **Note**: These are current patterns, not strict rules. Feel free to evolve them as needed.

## Architecture Overview

This project controls a poster through CSS custom properties (`--property-name`). Control panels modify these properties, which are defined with defaults in `styles/defaults.css`.

## Common Patterns

### 1. CSS Custom Properties

- Configurable values are typically CSS custom properties on `:root` or `body`
- Defaults are currently defined in `styles/defaults.css`
- JavaScript reads/writes these using `getComputedStyle()` and `setProperty()`

### 2. localStorage Sync

**Important**: Control panels currently sync state to localStorage for persistence

- Read from localStorage on page load
- Write to localStorage on user interaction
- Key naming is descriptive (e.g., `'customColors'`, `'zoomLevel'`)
- Values apply to both CSS properties and UI controls

### 3. Control Panel Structure

Each panel typically follows this pattern:

1. **Initialize**: Read defaults from CSS if no localStorage exists
2. **Load**: Apply saved localStorage values to both CSS and UI controls
3. **Listen**: Attach event listeners to controls
4. **Update**: On interaction, update CSS property AND save to localStorage

HTML panels use:

- `data-property` attributes to link UI controls to CSS properties
- `.control-panel` class with `.panel-header` and `.panel-content`
- `.collapsed` class for default collapsed state

### 4. Initialization

- `init-controls.js` syncs HTML inputs with CSS defaults on first load
- `settings-manager.js` tracks all CSS properties for export/reset functionality
- Use `getComputedStyle(document.body).getPropertyValue()` to read CSS defaults

### 5. UI State Sync

When updating controls, maintain visual feedback:

- Add/remove `.active` classes on buttons/inputs
- Update display values (e.g., sliders showing percentage)
- Sync happens in both directions: CSS → UI and UI → CSS

## Typical Workflow for New Panels

Reference existing panels (e.g., `color-picker.js`, `zoom.js`) as examples:

1. Define CSS custom property in `defaults.css`
2. Create control UI in HTML with `data-property` attributes
3. Implement JS module with localStorage sync (load & save)
4. Add property to `settings-manager.js` cssProperties array

**Key consideration**: localStorage sync ensures settings persist across page loads. 6. Update UI state indicators when values change
