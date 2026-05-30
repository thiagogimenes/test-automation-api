/// <reference types="cypress" /> 

const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")

describe('Funcionalidade de deleção de agendamento', () => {

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

    it('Deletar agendamento com sucesso', () => {
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

    it('Deletar um registros inexistente', () => {
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

    it.only('Deletar de um registro já deletado', () => {
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