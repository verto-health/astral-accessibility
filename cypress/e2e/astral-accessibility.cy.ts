describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('baseUrl'));

    cy.document().find('astral-accessibility');
  });
});
