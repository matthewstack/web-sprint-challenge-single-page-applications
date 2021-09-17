describe("Pizza Ordering App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });

  const fullNameInput = () => cy.get('input[id="name-input"]');
  const instructionsInput = () => cy.get('textArea[id="special-text"]');
  const redSauceRadio = () => cy.get('input[id="red"]');
  const pepperoniTopping = () => cy.get("input[name=pepperoni]");
  const onionsTopping = () => cy.get("input[name=onions]");
  const sizeMenu = () => cy.get('select[id="size-dropdown"]');
  const submitBtn = () => cy.get(`button[id="order-button"]`);
  const homeBtn = () => cy.get(`button[id="home"]`);
  const formBtn = () => cy.get(`button[id="order-pizza"]`);

  it("Make sure tests work", () => {
    expect(5 + 2).to.equal(7);
    expect(5 - 2).not.to.equal(5); // strict ===
    expect({}).not.to.equal({}); // strict ===
    expect({}).to.eql({});
  });

  describe("Filling out the inputs", () => {
    it("can fill in each type of input", () => {
      fullNameInput()
        .should("have.value", "")
        .type("Chris Farley")
        .should("have.value", "Chris Farley");
      instructionsInput()
        .should("have.value", "")
        .type("Please add extra napkins")
        .should("have.value", "Please add extra napkins");
      pepperoniTopping().should("not.be.checked").check().should("be.checked");
      redSauceRadio().should("not.be.checked").check().should("be.checked");
      sizeMenu()
        .should("have.value", "")
        .select("Large")
        .should("have.value", "Large");
    });
    it("can choose multiple toppings", () => {
      pepperoniTopping().should("not.be.checked").check().should("be.checked");
      onionsTopping().should("not.be.checked").check().should("be.checked");
    });
  });
  describe("Submmiting order", () => {
    it("can submit new order", () => {
      sizeMenu().select("Medium");
      redSauceRadio().check();
      pepperoniTopping().check();
      instructionsInput().type("Please add extra napkins");
      fullNameInput().type("Chris Farley");
      submitBtn().click();
    });
  });
  describe("Navigation works", () => {
    it("nav works", () => {
      homeBtn().click();
      cy.url().should("eq", "http://localhost:3000/");
      formBtn().click();
      cy.url().should("eq", "http://localhost:3000/pizza");
    });
  });
});
