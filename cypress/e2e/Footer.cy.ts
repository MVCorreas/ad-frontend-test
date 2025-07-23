describe("Footer test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the Apply Digital logo", () => {
    cy.get("footer").should("be.visible");
    cy.get('[data-test="footer-logo"]').should("be.visible");
  });

  it("should navigate back to the home page when the logo is clicked", () => {
    cy.get('[data-test="cart-icon"]').click();
    cy.url().should("include", "/cart");
    cy.get('[data-test="footer-logo"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
