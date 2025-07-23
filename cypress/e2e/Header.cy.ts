describe("Header test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the header with the site title", () => {
    cy.get("header").should("exist");
    cy.get("header").find("span").should("contain.text", "GamerShop");
  });

  it("should display the shopping cart icon", () => {
    cy.get('[data-test="cart-icon"]').should("exist");
  });

  it("should display the correct number of items in the cart", () => {
    cy.clearLocalStorage();
    cy.get('[data-test="cart-badge"]').should("not.exist");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get('[data-test="cart-badge"]').should("exist");
  });

  it("should remove the number of items in the cart when games are removed", () => {
    cy.clearLocalStorage();
    cy.get('[data-test="cart-badge"]').should("not.exist");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get('[data-test="cart-badge"]').should("exist");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("REMOVE").click();
      });
    cy.get('[data-test="cart-badge"]').should("not.exist");
  });

  it("should navigate to cart page when cart icon is clicked", () => {
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get('[data-test="cart-icon"]').click();
    cy.url().should("include", "/cart");
  });

  it("should navigate back to home page when site title is clicked", () => {
    cy.get('[data-test="cart-icon"]').click();
    cy.url().should("include", "/cart");
    cy.get("header").find("span").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
