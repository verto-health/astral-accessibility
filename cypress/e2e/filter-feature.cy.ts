describe("tests the enabling of different features", () => {
  it("passes", () => {
    //checks contract component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", { enabledFeatures: ["Contrast"] });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-contrast");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks screen reader component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Screen Reader"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-screen-reader");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks saturation component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Saturation"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-saturate");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks text size component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Bigger Text"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-text-size");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks text spacing component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Text Spacing"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-text-spacing");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks screen mask component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Screen Mask"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-screen-mask");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-line-height").should("not.exist");
    cy.clearLocalStorage();

    //checks line height component
    cy.visit(Cypress.env("blankUrl")).then(() => {
      cy.window().invoke("initializeAstral", {
        enabledFeatures: ["Line Height"],
      });
    });
    cy.waitForResource("main.js");
    cy.document().find("astral-line-height");
    cy.get("astral-screen-reader").should("not.exist");
    cy.get("astral-contrast").should("not.exist");
    cy.get("astral-saturate").should("not.exist");
    cy.get("astral-text-size").should("not.exist");
    cy.get("astral-text-spacing").should("not.exist");
    cy.get("astral-screen-mask").should("not.exist");
    cy.clearLocalStorage();
  });
});
