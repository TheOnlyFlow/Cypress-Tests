describe("Tickets", () => {
  beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"))

  it("fills all the text input fields", () => {

    const firstName = 'Guilherme'
    const lastName = 'Correa'

    cy.get("#first-name").type(firstName)
    cy.get("#last-name").type(lastName)
    cy.get("#email").type("guilhermetester@gmail.com")
    cy.get("#requests").type("Lau")
    cy.get("#signature").type(`${firstName} ${lastName}`)

  })

  it("select two tickets", () => {
    cy.get("#ticket-quantity").select("2")
  })

  it("select 'vip' ticket type", () => {
    cy.get("#vip").check()
  })

  it("select check boxes then uncheck 'friend'", () => {
    cy.get("#friend").check()
    cy.get("#publication").check()
    cy.get("#social-media").check()
    cy.get("#friend").uncheck()
  })

  it("has 'TICKETBOX' header's heading", () => { 
    cy.get("header h1").should("contain", "TICKETBOX")
  })

  it("alerts on invalid email", () => {
    cy.get("#email")
    .as("email")
    .type("blabla-gmail.com")

    cy.get("#email.invalid")
     .should("exist")
    

    cy.get("@email")
    .clear()
    .type("guilhermetester@gmail.com")

    cy.get("#email.invalid")
    .should("not.exist")
  })

  it("fills and reset the form", () => {
    // name and email
    const firstName = 'Guilherme'
    const lastName = 'Correa'
    const fullName = `${firstName} ${lastName}`

    cy.get("#first-name").type(firstName)
    cy.get("#last-name").type(lastName)
    cy.get("#email").type("guilhermetester@gmail.com")

    // tickets
    cy.get("#ticket-quantity").select("2")
    cy.get("#vip").check()


    // checkbox
    cy.get("#friend").check()
  
    // requests
    cy.get("#requests").type("Lau")

    // verification
    cy.get(".agreement p")
    .should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`)

    // agreement
    cy.get("#agree")
    .click()

    // signature
    cy.get("#signature").type(fullName)
    cy.get("button[type='submit']")
    .as("submitButton")
    .should("not.be.disabled")

    // reset
    cy.get("button[type='reset']")
    .click()

    cy.get("@submitButton")
    .should("be.disabled")
  })

    it("fills mandatory fields using support command", () => {
      const customer = {
        firstName: "Guilherme",
        lastName: "Correa",
        email: "guilhermetester@gmail.com"
      }

      cy.fillMandatoryFields(customer)

      cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled")
  
      cy.get("#agree")
      .uncheck()
  
      cy.get("@submitButton")
      .should("be.disabled")

    })
 
})