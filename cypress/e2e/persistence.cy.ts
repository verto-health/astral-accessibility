// Tests that accessibility settings survive a page reload (sessionStorage persistence).
// Each test: apply a setting → reload → verify it is restored.
// The widget modal is closed on reload, so re-open it before asserting widget state.
// CSS effects on <html> (classes, style tags) are visible without opening the modal.

describe("Persistence: settings survive page reload", () => {
  beforeEach(() => {
    cy.clearAllSessionStorage();
    cy.visit(Cypress.env("baseUrl"));
    cy.waitForResource("main.js");
    cy.document().find("astral-accessibility").click(); // open widget
  });

  it("persists contrast (Invert) across page reload", () => {
    cy.document().find("astral-contrast").click(); // → Invert
    cy.document().find("html").should("have.class", "astral_inverted");

    cy.reload();

    cy.document().find("html").should("have.class", "astral_inverted");
  });

  it("persists contrast (High Contrast) across page reload", () => {
    cy.document().find("astral-contrast").click(); // → Invert
    cy.document().find("astral-contrast").click(); // → High Contrast

    cy.reload();

    cy.document()
      .find(".card")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "color", "rgb(0, 0, 0)");
  });

  it("persists saturation setting across page reload", () => {
    cy.document().find("astral-saturate").click(); // → Low Saturation
    cy.document().find("html").should("have.class", "astral_low_saturation");

    cy.reload();

    cy.document().find("html").should("have.class", "astral_low_saturation");
  });

  it("persists text spacing setting across page reload", () => {
    cy.document().find("astral-text-spacing").click(); // → Light Spacing
    cy.document().find("html").should("have.class", "astral_light_spacing");

    cy.reload();

    cy.document().find("html").should("have.class", "astral_light_spacing");
  });

  it("persists line height setting across page reload", () => {
    cy.document().find("astral-line-height").click(); // → Light Height

    cy.reload();
    cy.document().find("astral-accessibility").click(); // re-open widget

    cy.document()
      .find("astral-line-height button")
      .should("have.class", "in-use");
  });

  it("persists text size setting across page reload", () => {
    cy.document().find("astral-text-size").click(); // → Medium Text

    cy.reload();
    cy.document().find("astral-accessibility").click(); // re-open widget

    cy.document()
      .find("astral-text-size button")
      .should("have.class", "in-use");
  });

  it("persists screen reader setting across page reload", () => {
    cy.document()
      .find("astral-screen-reader button")
      .then(($btn) => {
        if ($btn.prop("disabled")) {
          cy.log("Screen reader unavailable on this device — skipping");
          return;
        }

        cy.document().find("astral-screen-reader").click(); // → Read Normal

        cy.reload();
        cy.document().find("astral-accessibility").click(); // re-open widget

        cy.document()
          .find("astral-screen-reader button")
          .should("have.class", "in-use");
      });
  });

  it("persists screen mask (Large Cursor) across page reload", () => {
    cy.document().find("astral-screen-mask").click(); // → Large Cursor

    cy.reload();

    cy.document()
      .find("style")
      .should("contain", "cursor: url('data:image/png;base64");
  });

  it("persists screen mask (Reading Mask) across page reload", () => {
    cy.document().find("astral-screen-mask").click(); // → Large Cursor
    cy.document().find("astral-screen-mask").click(); // → Reading Mask
    cy.document().find(".mask-top").should("exist");

    cy.reload();

    cy.document().find(".mask-top").should("exist");
  });

  it("persists multiple settings simultaneously across page reload", () => {
    cy.document().find("astral-contrast").click(); // → Invert
    cy.document().find("astral-saturate").click(); // → Low Saturation
    cy.document().find("astral-text-spacing").click(); // → Light Spacing

    cy.reload();

    cy.document()
      .find("html")
      .should("have.class", "astral_inverted")
      .and("have.class", "astral_low_saturation")
      .and("have.class", "astral_light_spacing");
  });

  it("resets all settings when sessionStorage is cleared before reload", () => {
    cy.document().find("astral-contrast").click(); // → Invert
    cy.document().find("astral-saturate").click(); // → Low Saturation

    cy.document()
      .find("html")
      .should("have.class", "astral_inverted")
      .and("have.class", "astral_low_saturation");

    cy.clearAllSessionStorage();
    cy.reload();

    cy.document()
      .find("html")
      .should("not.have.class", "astral_inverted")
      .and("not.have.class", "astral_low_saturation");
  });
});
