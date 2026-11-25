/**
 * Log in using seeded credentials from cypress/fixtures/users.json.
 * Extend or replace this command during interview tasks as needed.
 *
 * @example cy.loginAs('employee')
 */
Cypress.Commands.add('loginAs', (role) => {
  cy.fixture('users').then((users) => {
    const user = users[role];

    cy.visit('/login');
    cy.get('#email').clear().type(user.email);
    cy.get('#password').clear().type(user.password);
    cy.get('button[type="submit"]').click();
    // Waits for post-login redirect
    cy.url().should('include', '/dashboard');
  });
});

/**
 * Stub window.confirm to accept the next dialog(s).
 * Call immediately before the action that triggers confirm (e.g. Delete click).
 *
 * @example cy.acceptConfirm(); cy.contains('button', 'Delete').click();
 */
Cypress.Commands.add('acceptConfirm', () => {
  cy.on('window:confirm', () => true);
});
