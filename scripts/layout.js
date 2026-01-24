// Layout configuration controls
document.addEventListener('DOMContentLoaded', function () {
    // Poster padding controls
    const posterPaddingTop = document.getElementById('poster-padding-top');
    const posterPaddingRight = document.getElementById('poster-padding-right');
    const posterPaddingBottom = document.getElementById(
        'poster-padding-bottom'
    );
    const posterPaddingLeft = document.getElementById('poster-padding-left');

    // Icon and spacing controls
    const iconSize = document.getElementById('icon-size');
    const headlineMargin = document.getElementById('headline-margin');

    // Axioms grid controls
    const axiomsColumnFlow = document.getElementById('axioms-column-flow');
    const axiomsGridColumns = document.getElementById('axioms-grid-columns');
    const axiomGapRow = document.getElementById('axiom-gap-row');
    const axiomGapColumn = document.getElementById('axiom-gap-column');

    // Axiom item controls
    const axiomGap = document.getElementById('axiom-gap');
    const axiomTextOffset = document.getElementById('axiom-text-offset');

    // Poster padding event listeners
    if (posterPaddingTop) {
        posterPaddingTop.addEventListener('input', function () {
            document.body.style.setProperty(
                '--poster-padding-top',
                this.value + 'px'
            );
            localStorage.setItem('posterPaddingTop', this.value);
        });
    }

    if (posterPaddingRight) {
        posterPaddingRight.addEventListener('input', function () {
            document.body.style.setProperty(
                '--poster-padding-right',
                this.value + 'px'
            );
            localStorage.setItem('posterPaddingRight', this.value);
        });
    }

    if (posterPaddingBottom) {
        posterPaddingBottom.addEventListener('input', function () {
            document.body.style.setProperty(
                '--poster-padding-bottom',
                this.value + 'px'
            );
            localStorage.setItem('posterPaddingBottom', this.value);
        });
    }

    if (posterPaddingLeft) {
        posterPaddingLeft.addEventListener('input', function () {
            document.body.style.setProperty(
                '--poster-padding-left',
                this.value + 'px'
            );
            localStorage.setItem('posterPaddingLeft', this.value);
        });
    }

    // Icon size event listener
    if (iconSize) {
        iconSize.addEventListener('input', function () {
            document.body.style.setProperty('--icon-size', this.value + 'px');
            localStorage.setItem('iconSize', this.value);
        });
    }

    // Headline margin event listener
    if (headlineMargin) {
        headlineMargin.addEventListener('input', function () {
            document.body.style.setProperty(
                '--headline-margin',
                this.value + 'px'
            );
            localStorage.setItem('headlineMargin', this.value);
        });
    }

    // Axioms column flow event listener
    if (axiomsColumnFlow) {
        axiomsColumnFlow.addEventListener('change', function () {
            document.body.style.setProperty(
                '--axioms-column-flow',
                this.checked
            );
            localStorage.setItem('axiomsColumnFlow', this.checked);
        });
    }

    // Axioms grid columns event listener
    if (axiomsGridColumns) {
        axiomsGridColumns.addEventListener('input', function () {
            document.body.style.setProperty(
                '--axioms-grid-columns',
                this.value
            );
            localStorage.setItem('axiomsGridColumns', this.value);
        });
    }

    // Axiom gap row event listener
    if (axiomGapRow) {
        axiomGapRow.addEventListener('input', function () {
            document.body.style.setProperty(
                '--axiom-gap-row',
                this.value + 'px'
            );
            localStorage.setItem('axiomGapRow', this.value);
        });
    }

    // Axiom gap column event listener
    if (axiomGapColumn) {
        axiomGapColumn.addEventListener('input', function () {
            document.body.style.setProperty(
                '--axiom-gap-column',
                this.value + 'px'
            );
            localStorage.setItem('axiomGapColumn', this.value);
        });
    }

    // Axiom gap event listener
    if (axiomGap) {
        axiomGap.addEventListener('input', function () {
            document.body.style.setProperty('--axiom-gap', this.value + 'px');
            localStorage.setItem('axiomGap', this.value);
        });
    }

    // Axiom text offset event listener
    if (axiomTextOffset) {
        axiomTextOffset.addEventListener('input', function () {
            document.body.style.setProperty(
                '--axiom-text-offset',
                axiomTextOffset.value + 'px'
            );
            localStorage.setItem('axiomTextOffset', this.value);
        });
    }

    // Load saved values from localStorage
    const savedPaddingTop = localStorage.getItem('posterPaddingTop');
    const savedPaddingRight = localStorage.getItem('posterPaddingRight');
    const savedPaddingBottom = localStorage.getItem('posterPaddingBottom');
    const savedPaddingLeft = localStorage.getItem('posterPaddingLeft');
    const savedIconSize = localStorage.getItem('iconSize');
    const savedHeadlineMargin = localStorage.getItem('headlineMargin');
    const savedAxiomsColumnFlow = localStorage.getItem('axiomsColumnFlow');
    const savedAxiomsGridColumns = localStorage.getItem('axiomsGridColumns');
    const savedAxiomGapRow = localStorage.getItem('axiomGapRow');
    const savedAxiomGapColumn = localStorage.getItem('axiomGapColumn');
    const savedAxiomGap = localStorage.getItem('axiomGap');
    const savedAxiomTextOffset = localStorage.getItem('axiomTextOffset');

    if (savedPaddingTop) {
        posterPaddingTop.value = savedPaddingTop;
        document.body.style.setProperty(
            '--poster-padding-top',
            savedPaddingTop + 'px'
        );
    }

    if (savedPaddingRight) {
        posterPaddingRight.value = savedPaddingRight;
        document.body.style.setProperty(
            '--poster-padding-right',
            savedPaddingRight + 'px'
        );
    }

    if (savedPaddingBottom) {
        posterPaddingBottom.value = savedPaddingBottom;
        document.body.style.setProperty(
            '--poster-padding-bottom',
            savedPaddingBottom + 'px'
        );
    }

    if (savedPaddingLeft) {
        posterPaddingLeft.value = savedPaddingLeft;
        document.body.style.setProperty(
            '--poster-padding-left',
            savedPaddingLeft + 'px'
        );
    }

    if (savedIconSize) {
        iconSize.value = savedIconSize;
        document.body.style.setProperty('--icon-size', savedIconSize + 'px');
    }

    if (savedHeadlineMargin) {
        headlineMargin.value = savedHeadlineMargin;
        document.body.style.setProperty(
            '--headline-margin',
            savedHeadlineMargin + 'px'
        );
    }

    if (savedAxiomsColumnFlow !== null) {
        axiomsColumnFlow.checked = savedAxiomsColumnFlow === 'true';
        document.body.style.setProperty(
            '--axioms-column-flow',
            savedAxiomsColumnFlow === 'true'
        );
    } else {
        // Initialize with default value from CSS
        const bodyStyles = getComputedStyle(document.body);
        const defaultValue =
            bodyStyles.getPropertyValue('--axioms-column-flow').trim() ===
            'true';
        axiomsColumnFlow.checked = defaultValue;
        document.body.style.setProperty('--axioms-column-flow', defaultValue);
    }

    if (savedAxiomsGridColumns) {
        axiomsGridColumns.value = savedAxiomsGridColumns;
        document.body.style.setProperty(
            '--axioms-grid-columns',
            savedAxiomsGridColumns
        );
    }

    if (savedAxiomGapRow) {
        axiomGapRow.value = savedAxiomGapRow;
        document.body.style.setProperty(
            '--axiom-gap-row',
            savedAxiomGapRow + 'px'
        );
    }

    if (savedAxiomGapColumn) {
        axiomGapColumn.value = savedAxiomGapColumn;
        document.body.style.setProperty(
            '--axiom-gap-column',
            savedAxiomGapColumn + 'px'
        );
    }

    if (savedAxiomGap) {
        axiomGap.value = savedAxiomGap;
        document.body.style.setProperty('--axiom-gap', savedAxiomGap + 'px');
    }

    if (savedAxiomTextOffset) {
        axiomTextOffset.value = savedAxiomTextOffset;
        document.body.style.setProperty(
            '--axiom-text-offset',
            savedAxiomTextOffset + 'px'
        );
    }
});
