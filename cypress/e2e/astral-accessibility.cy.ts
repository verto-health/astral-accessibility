describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.waitForResource('main.js');

    const textElements = 'p,h1,h2,h3,h4,h5,h6,div,a,button,label';

    const ally = cy.document().find('astral-accessibility');
    ally.click();
    ally.find('.astral-modal').should('have.class', 'active');

    const contrastComponent = cy.document().find('astral-contrast');
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

    // revert
    contrastComponent.click();
    cy.document()
      .find('html')
      .find('.card')
      .should('have.css', 'background-color', 'rgba(255, 255, 255, 0.7)')
      .and('have.css', 'color', 'rgb(0, 0, 0)');

    const saturationComponent = cy.document().find('astral-saturate');

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
    const defaultFontSize = 16;
    cy.document()
      .find('html')
      .should('not.have.class', 'astral_desaturated')
      .and('not.have.class', 'astral_high_saturation')
      .and('not.have.class', 'astral_low_saturation');

    const spacingComponent = cy.document().find('astral-text-spacing');
    // light spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should('have.css', 'word-spacing', `${defaultFontSize * 0.16}px`)
      .and('have.css', 'letter-spacing', `${defaultFontSize * 0.12}px`);

    // medium spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should('have.css', 'word-spacing', `${defaultFontSize * 0.32}px`)
      .and('have.css', 'letter-spacing', `${defaultFontSize * 0.24}px`);

    // heavy spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should('have.css', 'word-spacing', `${defaultFontSize * 0.48}px`)
      .and('have.css', 'letter-spacing', `${defaultFontSize * 0.36}px`);

    // revert spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should('have.css', 'word-spacing', `0px`)
      .and('have.css', 'letter-spacing', `0`);

    /*********************
        text-size test 
    **********************/
    const textSizeComopnent = cy.document().find('astral-text-size');
    const mediumTextScale = 1.2;
    const largeTextScale = 1.5;
    const extraLargeTextScale = 1.8;

    // get original styling
    const initialStyling = new WeakMap();
    cy.document()
      .get(textElements)
      .each((elmt) => {
        initialStyling.set(
          elmt.get(0),
          elmt.css(['font-size', 'line-height', 'word-spacing'])
        );
      });

    // medium text
    textSizeComopnent.click();

    cy.document()
      .get('.card')
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ['font-size'].replaceAll(/\D/g, '');
          cy.wrap(elmt).should(
            'have.css',
            'font-size',
            `${initialSize * mediumTextScale}px`
          );
        }
      });

    // large text
    textSizeComopnent.click();

    cy.document()
      .get('.card')
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ['font-size'].replaceAll(/\D/g, '');
          cy.wrap(elmt).should(
            'have.css',
            'font-size',
            `${initialSize * largeTextScale}px`
          );
        }
      });

    // extra text
    textSizeComopnent.click();

    cy.document()
      .get('.card')
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ['font-size'].replaceAll(/\D/g, '');
          cy.wrap(elmt).should(
            'have.css',
            'font-size',
            `${initialSize * extraLargeTextScale}px`
          );
        }
      });

    // revert text scale change
    textSizeComopnent.click();

    cy.document()
      .get('.card')
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ['font-size'].replaceAll(/\D/g, '');
          cy.wrap(elmt).should('have.css', 'font-size', `${initialSize}px`);
        }
      });
  });
});
