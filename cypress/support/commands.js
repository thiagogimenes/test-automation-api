Cypress.Commands.add('Login', (username, password) => {
    cy.request({
        method: "POST",
        url: "/auth",
        body: {
            username: username,
            password: password
        }
    })
})

// Cypress.Commands.add('CadastroAgendamento', (agendamento))