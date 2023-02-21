describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('baseUrl'));

    const ally = cy.document().find('astral-accessibility');
    const homePage = cy.document().find('html');

    ally.click();
    ally.find('.astral-modal').should('have.class', 'active');

    const contrastComponent = ally.find('astral-contrast');
    // inverted
    contrastComponent.click();
    cy.document().find('html').should('have.class', 'astral_inverted');

    // high contrast
    contrastComponent.click();
    cy.document().find('html').should('not.have.class', 'astral_inverted');
    cy.document()
      .find('html')
      .find('.card')
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
      .and('have.css', 'color', 'rgb(0, 0, 0)');

    // dakr high contrast
    contrastComponent.click();
    cy.document()
      .find('html')
      .find('.card')
      .should('have.css', 'background-color', 'rgb(0, 0, 0)')
      .and('have.css', 'color', 'rgb(255, 255, 255)')
      .and('have.css', 'font-weight', '700');

    contrastComponent.click();
    cy.document()
      .find('html')
      .find('.card')
      .should('have.css', 'background-color', 'rgba(255, 255, 255, 0.7)')
      .and('have.css', 'color', 'rgb(0, 0, 0)');

    const saturationComponent = cy
      .document()
      .find('html')
      .find('astral-saturate');

    // Low Saturation
    saturationComponent.click();
    cy.document().find('html').should('have.class', 'astral_low_saturation');

    // High Saturated
    saturationComponent.click();
    cy.document()
      .find('html')
      .should('have.class', 'astral_high_saturation')
      .and('not.have.class', 'astral_low_saturation')
      .and('not.have.class', 'astral_desaturated');

    // Desaturated
    saturationComponent.click();
    cy.document()
      .find('html')
      .should('have.class', 'astral_desaturated')
      .and('not.have.class', 'astral_high_saturation')
      .and('not.have.class', 'astral_low_saturation');

    // reset saturation
    saturationComponent.click();
    cy.document()
      .find('html')
      .should('not.have.class', 'astral_desaturated')
      .and('not.have.class', 'astral_high_saturation')
      .and('not.have.class', 'astral_low_saturation');
  });
});
