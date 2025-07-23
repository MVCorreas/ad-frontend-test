describe("Games Catalog", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display a header and footer", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("should display a loading gif and a message", () => {
    cy.contains("Loading GamerShop...", { timeout: 1000 }).should("exist");
  });

  it("should display a title and a searchbar", () => {
    cy.get(".text-2xl").should("exist").and("contain.text", "Top Sellers");
    cy.contains("Genre").should("be.visible");
    cy.get("select").should("exist");
  });

  it("should load a list of games", () => {
    cy.get(":nth-child(2) > .max-w-7xl").should("exist");
    cy.get(".grid > div").should("have.length", 12);
  });

  it("should display a button to load more games", () => {
    cy.get(".mt-12 > .flex > :nth-child(1)")
      .should("exist")
      .and("contain.text", "SEE MORE");
  });

  it('should add a game to the cart when the "ADD TO CART" button is clicked', () => {
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get(".space-x-2 > .absolute").should("exist");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("REMOVE").should("exist");
      });
  });
  
  it('should remove a game from the cart when the "REMOVE" button is clicked', () => {
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("ADD TO CART").click();
      });
    cy.get(".space-x-2 > .absolute").should("exist");
    cy.get(".grid > div")
      .first()
      .within(() => {
        cy.contains("REMOVE").should("exist").click();
      });
    cy.get(".space-x-2 > .absolute").should("not.exist");
  });
});
