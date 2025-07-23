describe("Cart Page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/cart");
  });

  it("should display the cart page with the correct title", () => {
    cy.get("h1").should("have.text", "Your Cart");
  });

  it("should display a link to the home page", () => {
    cy.get("h3").contains("Back to Catalog").should("exist");
    cy.get("h3").contains("Back to Catalog").click();
    cy.url().should("include", "/");
  });

  it("should display an message when cart is empty", () => {
    cy.get(".text-center > .text-lg").should("have.text", "Your cart is empty");
    cy.get(".mt-8 > .text-lg").should("have.text", "0 items");
  });

  it("should display a grid with items in the cart if there are any", () => {
    cy.visit("http://localhost:3000");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.visit("http://localhost:3000/cart");
    cy.get(".grid").should("exist");
    cy.get(".space-x-4").should("have.length", 1);
  });

  it("should remove an item from the cart", () => {
    cy.visit("http://localhost:3000");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.visit("http://localhost:3000/cart");
    cy.get(".grid").should("exist");
    cy.get(".space-x-4").should("have.length", 1);
    cy.get(".text-gray-400").should("exist").click();
    cy.get('[data-test="cart-badge"]').should("not.exist");
  });

  it("should display the order summary section with number of items, name, price and total amount", () => {
    cy.visit("http://localhost:3000");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.visit("http://localhost:3000/cart");
    cy.get(".max-w-md > .bg-white").should("exist");
    cy.get(".max-w-md > .bg-white").should("contain.text", "Order Summary");
    cy.get(".max-w-md > .bg-white").should("contain.text", "1 item");
    cy.get('[data-test="cart-game-name"]').should("exist");
    cy.get('[data-test="cart-game-price"]').should("exist");
    cy.get('[data-test="order-total"]').should("exist");
  });

  it("should display a checkout button", () => {
    cy.visit("http://localhost:3000");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.visit("http://localhost:3000/cart");
    cy.get('[data-test="button"]').should("exist");
    cy.get('[data-test="button"]').should("contain.text", "Checkout");
  });
});
