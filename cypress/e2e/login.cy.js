describe('Login', () => {
  it('Login com sucesso', () => {
    cy.visit('https://automationpratice.com.br/login')
    cy.get('#user').type('teste@mock.com')
    cy.get('#password').type('123456')
    cy.get('#btnLogin').click()
    cy.get('.swal2-confirm').click()
  })

  it('Login com dados inválidos', () => {
    cy.visit('https://automationpratice.com.br/login')
    cy.get('#user').type('teste')
    cy.get('#password').type('123456')
    cy.get('#btnLogin').click()
    cy.get('.swal2-confirm').click()
  });

  it('Login com dados vazios', () => {
    cy.visit('https://automationpratice.com.br/login')
    cy.get('#user').type('')
    cy.get('#password').type('')
    cy.get('#btnLogin').click()
    cy.get('.swal2-confirm').click()
  });

  it('Login com senha inválida', () => {
    cy.visit('https://automationpratice.com.br/login')
    cy.get('#user').type('teste@mock.com')
    cy.get('#password').type('65161')
    cy.get('#btnLogin').click()
    cy.get('.swal2-confirm').click()
  });
})