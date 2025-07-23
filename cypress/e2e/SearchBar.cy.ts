describe("Search Bar test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the search bar with a genre filter", () => {
    cy.get('[data-test="search-bar"]').should("be.visible");
    cy.get('[data-test="search-bar"] > .font-medium').should(
      "contain.text",
      "Genre"
    );
    cy.get('[data-test="search-bar"] select').should("exist");
  });

  it("should display a list of genres when the filter is clicked", () => {
    cy.get("#genre-filter").should("exist");
    cy.get("#genre-filter option").should("have.length.greaterThan", 1);
    cy.get("#genre-filter option").first().should("contain.text", "All");
    cy.get("#genre-filter").select("Action");
    cy.url().should("include", "genre=Action");
    cy.get('[data-test="game-genre"]').each(($genre) => {
      cy.wrap($genre).should("contain.text", "Action");
    });
  });
});
