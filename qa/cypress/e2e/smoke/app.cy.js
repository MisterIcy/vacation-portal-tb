/**
 * Setup verification spec — confirms Cypress can reach the running application.
 * Interview tasks should be added under cypress/e2e/ in separate spec files.
 */
describe('Application setup', () => {
  it('loads the login page', () => {
    cy.visit('/login');
    cy.contains('h1', 'Vacation Portal').should('be.visible');
  });
});
