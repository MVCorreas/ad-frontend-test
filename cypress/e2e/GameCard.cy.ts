describe("Game Card test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display a card with an image, genre, name and price", () => {
    cy.get('[data-test="game-card"]').should("exist");
    cy.get('[data-test="game-card"] img').should("exist");
    cy.get('[data-test="game-genre"]').should("exist");
    cy.get('[data-test="game-name"]').should("exist");
    cy.get('[data-test="game-price"]').should("exist");
  });

  it("should display a 'NEW' label for new games", () => {
    cy.get('[data-test="game-card"]')
      .first()
      .within(() => {
        cy.get('[data-test="new-label"]').should("exist");
      });
  });

  it("should display a button to add a game to the cart if it has not been added yet", () => {
    cy.get('[data-test="game-card"]')
      .first()
      .within(() => {
        cy.contains("ADD TO CART").should("exist");
      });
  });

  it("should display a button to remove a game from the cart if it has already been added", () => {
    cy.get('[data-test="game-card"]')
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get('[data-test="game-card"]')
      .first()
      .within(() => {
        cy.contains("REMOVE").should("exist");
      });
  });
});
