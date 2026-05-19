/// <reference types="cypress" /> 

describe('Realizar login', () => {

    it('Deve realizar login com sucesso', () => {
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: {
                username: "admin",
                password: "password123"
            }
        }).then((resultado) => {
            expect(resultado.status).to.equal(200)
        })
    });

    it('Login com senha inválida', () => {
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: {
                username: "admin",
                password: "password23"
            }
        }).then((resultado) => {
            expect(resultado.status).to.equal(200)
            expect(resultado.body.reason).to.equal("Bad credentials")
        })
    });

    it('Login com usuário inválido', () => {
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/auth",
            body: {
                username: "user",
                password: "password123"
            }
        }).then((resultado) => {
            expect(resultado.status).to.equal(200)
            expect(resultado.body.reason).to.equal("Bad credentials")
        })
    });
});