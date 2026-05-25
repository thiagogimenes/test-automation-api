/// <reference types="cypress" /> 

const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")

describe('Deletar agendamento', () => {

        let token = ''

        beforeEach(( ) => {

            cy.request({
                method: "POST",
                url: "/auth",
                body: {
                    username: "admin",
                    password: "password123"
                }
            }).then((resultado) => {
                token = resultado.body.token
            })
        })

    it('Deve deletar agendamento com sucesso', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)

            const id = resposta.body.bookingid

            cy.request({
                method: "DELETE",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(201)
                });
        })
    });

    it('Não deve deletar um registros inexistente', () => {
        cy.request({
                method: "DELETE",
                url: `/booking/xpto`,
                headers: {
                    "cookie": `token=${token}`,
                },
                failOnStatusCode: false,
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(405)
                });

    });

    it.only('Não deve deletar um registro já deletado', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)

            const id = resposta.body.bookingid

            cy.request({
                method: "DELETE",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(201)
                    cy.log("Registro apagado")
                });
            
               cy.request({
                method: "DELETE",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                },
                failOnStatusCode: false,
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(405)
                    cy.log("Tentando apagar o registro novamente")
                });
        })
    });
});