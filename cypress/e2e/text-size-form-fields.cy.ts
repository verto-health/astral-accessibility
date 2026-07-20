/**
 * Verifies that the "Bigger Text" control scales form fields and their labels
 * on the demo's Bigger Text page: the label text, a text input, a textarea and
 * a <select> dropdown. The <select> is the important case — it has <option>
 * children and no direct text node, so it previously escaped scaling.
 */
describe("bigger text scales form fields and labels", () => {
  // Matches the label text, input, textarea and select in the demo form.
  const FORM_FIELDS =
    ".demo-form .demo-field-label, .demo-form input, .demo-form textarea, .demo-form select";

  const mediumTextScale = 1.2;
  const largeTextScale = 1.5;
  const extraLargeTextScale = 1.8;

  it("scales every form field and label, then restores them", () => {
    cy.visit(`${Cypress.env("baseUrl")}#/bigger-text`);
    cy.waitForResource("main.js");

    // Make sure the demo form (including the dropdown) has rendered.
    cy.get(".demo-form select").should("exist");

    // Capture the original font size of each field, in DOM order.
    const initial: number[] = [];
    cy.get(FORM_FIELDS).each(($el) => {
      initial.push(parseFloat($el.css("font-size")));
    });

    const assertScaled = (scale: number) =>
      cy.get(FORM_FIELDS).each(($el, i) => {
        expect(parseFloat($el.css("font-size"))).to.be.closeTo(
          initial[i] * scale,
          0.6,
        );
      });

    // Open the widget so the text-size control is interactive.
    cy.document().find("astral-accessibility").click();
    const textSize = cy.document().find("astral-text-size");

    // Medium
    textSize.click();
    assertScaled(mediumTextScale);

    // Large
    textSize.click();
    assertScaled(largeTextScale);

    // Extra Large
    textSize.click();
    assertScaled(extraLargeTextScale);

    // Revert back to the base size.
    textSize.click();
    cy.get(FORM_FIELDS).each(($el, i) => {
      expect(parseFloat($el.css("font-size"))).to.be.closeTo(initial[i], 0.6);
    });
  });
});
