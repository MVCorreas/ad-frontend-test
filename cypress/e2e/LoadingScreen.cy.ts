describe("Loading Screen test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the loading screen when navigating to home page", () => {
    cy.contains("Loading GamerShop...", { timeout: 1000 }).should("exist");
  });
});
