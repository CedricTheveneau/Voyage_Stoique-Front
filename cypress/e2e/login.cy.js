describe('Test de la page de connexion', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('devrait afficher le formulaire de connexion correctement', () => {
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('devrait permettre à un utilisateur de se connecter avec des informations valides', () => {
    cy.get('input[type="email"]').type('theveneaucedricpro@gmail.com');
    cy.get('input[type="password"]').type('13C01t2001#');

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000' + '/');
    cy.window().its('localStorage').should('have.property', 'user');
  });

  it('devrait afficher un message d\'erreur avec des informations invalides', () => {
    cy.get('input[type="email"]').type('utilisateur@exemple.com');
    cy.get('input[type="password"]').type('mauvaismotdepasse');

    cy.get('button[type="submit"]').click();

    cy.get('p').should('contain', "User not found");
  });
});