describe("template spec", () => {
  it("passes", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.waitForResource("main.js");

    const textElements = "p,h1,h2,h3,h4,h5,h6,div,a,button,label";

    const ally = cy.document().find("astral-accessibility");
    ally.click();
    ally.find(".astral-modal").should("have.class", "active");

    const contrastComponent = cy.document().find("astral-contrast");
    // inverted
    contrastComponent.click();
    cy.document().find("html").should("have.class", "astral_inverted");

    // high contrast
    contrastComponent.click();
    cy.document().find("html").should("not.have.class", "astral_inverted");
    cy.document()
      .find("html")
      .find(".card")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "color", "rgb(0, 0, 0)");

    // dakr high contrast
    contrastComponent.click();
    cy.document()
      .find("html")
      .find(".card")
      .should("have.css", "background-color", "rgb(0, 0, 0)")
      .and("have.css", "color", "rgb(255, 255, 255)")
      .and("have.css", "font-weight", "700");

    // revert
    contrastComponent.click();
    cy.document()
      .find("html")
      .find(".card")
      .should("have.css", "background-color", "rgba(255, 255, 255, 0.7)")
      .and("have.css", "color", "rgb(0, 0, 0)");

    const saturationComponent = cy.document().find("astral-saturate");

    // Low Saturation
    saturationComponent.click();
    cy.document().find("html").should("have.class", "astral_low_saturation");

    // High Saturated
    saturationComponent.click();
    cy.document()
      .find("html")
      .should("have.class", "astral_high_saturation")
      .and("not.have.class", "astral_low_saturation")
      .and("not.have.class", "astral_desaturated");

    // Desaturated
    saturationComponent.click();
    cy.document()
      .find("html")
      .should("have.class", "astral_desaturated")
      .and("not.have.class", "astral_high_saturation")
      .and("not.have.class", "astral_low_saturation");

    // reset saturation
    saturationComponent.click();
    const defaultFontSize = 16;
    cy.document()
      .find("html")
      .should("not.have.class", "astral_desaturated")
      .and("not.have.class", "astral_high_saturation")
      .and("not.have.class", "astral_low_saturation");

    const spacingComponent = cy.document().find("astral-text-spacing");
    // light spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should("have.css", "word-spacing", `${defaultFontSize * 0.16}px`)
      .and("have.css", "letter-spacing", `${defaultFontSize * 0.12}px`);

    // medium spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should("have.css", "word-spacing", `${defaultFontSize * 0.32}px`)
      .and("have.css", "letter-spacing", `${defaultFontSize * 0.24}px`);

    // heavy spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should("have.css", "word-spacing", `${defaultFontSize * 0.48}px`)
      .and("have.css", "letter-spacing", `${defaultFontSize * 0.36}px`);

    // revert spacing
    spacingComponent.click();
    cy.document()
      .get(textElements)
      .should("have.css", "word-spacing", `0px`)
      .and("have.css", "letter-spacing", `0`);

    /*********************
        text-size test 
    **********************/
    const textSizeComopnent = cy.document().find("astral-text-size");
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
          elmt.css(["font-size", "line-height", "word-spacing"]),
        );
      });

    // medium text
    textSizeComopnent.click();

    cy.document()
      .get(".card")
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ["font-size"].replaceAll(/\D/g, "");
          cy.wrap(elmt).should(
            "have.css",
            "font-size",
            `${initialSize * mediumTextScale}px`,
          );
        }
      });

    // large text
    textSizeComopnent.click();

    cy.document()
      .get(".card")
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ["font-size"].replaceAll(/\D/g, "");
          cy.wrap(elmt).should(
            "have.css",
            "font-size",
            `${initialSize * largeTextScale}px`,
          );
        }
      });

    // extra text
    textSizeComopnent.click();

    cy.document()
      .get(".card")
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ["font-size"].replaceAll(/\D/g, "");
          cy.wrap(elmt).should(
            "have.css",
            "font-size",
            `${initialSize * extraLargeTextScale}px`,
          );
        }
      });

    // revert text scale change
    textSizeComopnent.click();

    cy.document()
      .get(".card")
      .contains(/^S/g)
      .each((elmt) => {
        if (initialStyling.has(elmt.get(0))) {
          const initialSize = initialStyling
            .get(elmt.get(0))
            ["font-size"].replaceAll(/\D/g, "");
          cy.wrap(elmt).should("have.css", "font-size", `${initialSize}px`);
        }
      });

    const screenMaskComponent = cy.document().find("astral-screen-mask");
    // cursor size check
    cy.document()
      .find("style")
      .should(
        "not.contain",
        "cursor: url('data:image/png;base64,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'), auto;",
      );
    screenMaskComponent.click();
    cy.document()
      .find("style")
      .should(
        "contain",
        "cursor: url('data:image/png;base64,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'), auto;",
      );

    // screen mask check

    cy.document().find(".mask-top").should("not.exist");
    screenMaskComponent.click();
    cy.document().find(".mask-top").should("exist");
    cy.reload();
    cy.document().find(".mask-top").should("not.exist");
  });
});
