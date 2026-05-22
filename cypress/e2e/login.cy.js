/// <reference types="cypress" /> 

describe('Realizar login', () => {

    it('Deve realizar login com sucesso', () => {
        cy.Login("admin", "password123")
        .then((resultado) => {
            expect(resultado.status).to.equal(200)
        })
    });

    it('Login com senha inválida', () => {
        cy.Login("admin","password23")
        .then((resultado) => {
            expect(resultado.status).to.equal(200)
            expect(resultado.body.reason).to.equal("Bad credentials")
        })
    });

    it('Login com usuário inválido', () => {
        cy.Login("user", "password123").then((resultado) => {
            expect(resultado.status).to.equal(200)
            expect(resultado.body.reason).to.equal("Bad credentials")
        })
    });
});