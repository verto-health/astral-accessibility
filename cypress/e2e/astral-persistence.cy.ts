/// <reference types="cypress" />

describe('Astral Accessibility Settings Persistence', () => {
  const ASTRAL_PANEL_SELECTOR = 'astral-accessibility .astral-icon'; // Placeholder, adjust if needed
  const TEXT_SIZE_BUTTON_SELECTOR = 'astral-text-size button';
  const TEXT_SIZE_STATE_SELECTOR = 'astral-text-size button .state-dots-wrap span';
  const CONTRAST_BUTTON_SELECTOR = 'astral-contrast button';
  const CONTRAST_STATE_SELECTOR = 'astral-contrast button .state-dots-wrap span';

  // Expected states after interactions
  const TEXT_SIZE_TARGET_STATE_TEXT = 'Large Text'; // Assumes 2 clicks from base
  const CONTRAST_TARGET_STATE_TEXT = 'High Contrast'; // Assumes 2 clicks from base
  const CONTRAST_EXPECTED_CLASS = 'astral_high_contrast'; // From ContrastComponent logic

  beforeEach(() => {
    // Potentially clear session storage before each test if needed,
    // though for this specific test, we want to see persistence from a previous action.
    // cy.clearAllSessionStorage(); // Uncomment if tests need to be fully isolated from each other's session state
  });

  it('should persist accessibility settings across page navigations', () => {
    // 1. Visit the first demo page
    cy.visit('index.html');

    // 2. Open the Astral accessibility panel
    // This selector might need adjustment based on the actual trigger button for the panel.
    // Assuming the panel opens on click of a main button/icon within astral-accessibility.
    // If the panel is always open, this step can be skipped.
    cy.get('astral-accessibility').should('be.visible'); // Ensure the component is there
    // Let's assume for now the panel is open by default or the widgets are directly visible.
    // If there's a specific toggle for the whole panel:
    // cy.get(ASTRAL_PANEL_SELECTOR).click();

    // 3. Apply Text Size setting
    cy.get(TEXT_SIZE_BUTTON_SELECTOR).should('be.visible').as('textSizeButton');
    cy.get('@textSizeButton').click(); // Click 1: Medium Text
    cy.get('@textSizeButton').click(); // Click 2: Large Text
    cy.get(TEXT_SIZE_STATE_SELECTOR).should('contain.text', TEXT_SIZE_TARGET_STATE_TEXT);

    // 3. Apply Contrast setting
    cy.get(CONTRAST_BUTTON_SELECTOR).should('be.visible').as('contrastButton');
    cy.get('@contrastButton').click(); // Click 1: Invert
    cy.get('@contrastButton').click(); // Click 2: High Contrast
    cy.get(CONTRAST_STATE_SELECTOR).should('contain.text', CONTRAST_TARGET_STATE_TEXT);

    // 4. Verify the settings are applied on the current page (index.html)
    // For Text Size, the state text is already checked.
    // For Contrast, check for the class on documentElement
    cy.document().its('documentElement').should('have.class', CONTRAST_EXPECTED_CLASS);

    // Check if session storage has the expected keys (optional, but good for debugging)
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('astral-textSize-state')).to.equal('2'); // Assuming Large Text is state 2
      expect(win.sessionStorage.getItem('astral-contrast-state')).to.equal('2'); // Assuming High Contrast is state 2
    });

    // 5. Navigate to the second demo page
    // Option 1: Direct visit
    cy.visit('blank-page.html');
    // Option 2: Click a link (if one exists)
    // cy.get('a[href="blank-page.html"]').click();

    // 6. Verify that the Astral panel is still present and settings are active on the new page
    cy.get('astral-accessibility').should('be.visible');
    // If panel was explicitly opened, it might need to be reopened or might remember its state too.
    // For now, assuming widgets are visible.

    // Verify Text Size is still "Large Text"
    cy.get(TEXT_SIZE_STATE_SELECTOR)
      .should('be.visible')
      .should('contain.text', TEXT_SIZE_TARGET_STATE_TEXT);

    // Verify Contrast is still "High Contrast"
    cy.get(CONTRAST_STATE_SELECTOR)
      .should('be.visible')
      .should('contain.text', CONTRAST_TARGET_STATE_TEXT);

    // Re-verify the actual applied effects on the new page
    cy.document().its('documentElement').should('have.class', CONTRAST_EXPECTED_CLASS);

    // Check session storage again on the new page (optional)
    cy.window().then((win) => {
      expect(win.sessionStorage.getItem('astral-textSize-state')).to.equal('2');
      expect(win.sessionStorage.getItem('astral-contrast-state')).to.equal('2');
    });

    // Could also add a check for text size application, e.g., body font style,
    // but this can be complex if styles are applied to many elements.
    // cy.get('body').should('have.css', 'font-size').and('not.equal', '16px'); // Example, actual base font size might vary
  });
});
