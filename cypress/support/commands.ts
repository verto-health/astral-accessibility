/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/testing-dom__wait-for-resource
Cypress.Commands.add("waitForResource", (name, options = {}) => {
  if (Cypress.browser.family === "firefox") {
    cy.log("Skip waitForResource in Firefox");

    return;
  }

  cy.log(`Waiting for resource ${name}`);

  const log = false; // let's not log inner commands
  const timeout = options.timeout || Cypress.config("defaultCommandTimeout");

  cy.window({ log }).then(
    // note that ".then" method has options first, callback second
    // https://on.cypress.io/then
    { log, timeout },
    (win) => {
      return new Cypress.Promise((resolve, reject) => {
        let foundResource;

        // control how long we should try finding the resource
        // and if it is still not found. An explicit "reject"
        // allows us to show nice informative message
        setTimeout(() => {
          if (foundResource) {
            // nothing needs to be done, successfully found the resource
            return;
          }

          clearInterval(interval);
          reject(new Error(`Timed out waiting for resource ${name}`));
        }, timeout);

        const interval = setInterval(() => {
          foundResource = win.performance
            .getEntriesByType("resource")
            .find((item) => item.name.endsWith(name));

          if (!foundResource) {
            // resource not found, will try again
            return;
          }

          clearInterval(interval);
          // because cy.log changes the subject, let's resolve the returned promise
          // with log + returned actual result
          resolve(
            cy.log("✅ success").then(() => {
              // let's resolve with the found performance object
              // to allow tests to inspect it
              return foundResource;
            })
          );
        }, 100);
      });
    }
  );
});
