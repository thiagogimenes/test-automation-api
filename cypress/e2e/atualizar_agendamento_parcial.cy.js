/// <reference types="cypress" /> 

const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")

describe('Atualizar agendamento parcial', () => {

    let token = ''

    beforeEach(() => {
        cy.Login("admin", "password123")
        .then((resultado) => {
            token = resultado.body.token
        })
    })

    it('Deve atualizar nome e sobrenome do agendamento', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.booking.firstname).to.equal(agendamento_sucesso.firstname)
            expect(resposta.body.booking.lastname).to.equal(agendamento_sucesso.lastname)

            const id = resposta.body.bookingid

            cy.log("Cadastrando agendamento")

            cy.request({
                method: "PATCH",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                },
                body: {
                    "firstname": "Jorge",
                    "lastname": "Bravo"
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(200)
                    expect(resposta.body.firstname).to.equal("Jorge")
                    expect(resposta.body.lastname).to.equal("Bravo")
                    expect(resposta.body.totalprice).to.equal(agendamento_sucesso.totalprice)
                    expect(resposta.body.bookingdates.checkin).to.equal(agendamento_sucesso.bookingdates.checkin)
                    expect(resposta.body.bookingdates.checkout).to.equal(agendamento_sucesso.bookingdates.checkout)
                    expect(resposta.body.additionalneeds).to.equal(agendamento_sucesso.additionalneeds)
                    cy.log("Agendamento alterado")
                })
        })
    });

    it('Não deve atualizar agendamento com id inválido', () => {
        cy.request({
            method: "PATCH",
            url: "/booking/654321",
            headers: {
                "cookie": `token=${token}`,
            },
            failOnStatusCode: false,
            body: {
                "firstname": "Jorge",
                "lastname": "Bravo"
            }
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(405)
            })
    })

    it('Tentar atualizar sem token', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.booking.firstname).to.equal(agendamento_sucesso.firstname)
            expect(resposta.body.booking.lastname).to.equal(agendamento_sucesso.lastname)

            const id = resposta.body.bookingid

            cy.log("Cadastrando agendamento")

            cy.request({
                method: "PATCH",
                url: `/booking/${id}`,
                failOnStatusCode: false,
                body: {
                    "firstname": "Jorge",
                    "lastname": "Bravo"
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(403)
                    cy.log("Atualização do agendamento não autorizado")
                })
        })
    });

    it('Deve atualizar apenas o firstName', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.booking.firstname).to.equal(agendamento_sucesso.firstname)
            expect(resposta.body.booking.lastname).to.equal(agendamento_sucesso.lastname)

            const id = resposta.body.bookingid

            cy.log("Cadastrando agendamento")

            cy.request({
                method: "PATCH",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                },
                body: {
                    "firstname": "Jorge"
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(200)
                    expect(resposta.body.firstname).to.equal("Jorge")
                    expect(resposta.body.lastname).to.equal(agendamento_sucesso.lastname)
                    expect(resposta.body.totalprice).to.equal(agendamento_sucesso.totalprice)
                    expect(resposta.body.bookingdates.checkin).to.equal(agendamento_sucesso.bookingdates.checkin)
                    expect(resposta.body.bookingdates.checkout).to.equal(agendamento_sucesso.bookingdates.checkout)
                    expect(resposta.body.additionalneeds).to.equal(agendamento_sucesso.additionalneeds)
                    cy.log("Agendamento alterado")
                })
        })
    });

    it('Deve atualizar apenas o lastName', () => {
        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.booking.firstname).to.equal(agendamento_sucesso.firstname)
            expect(resposta.body.booking.lastname).to.equal(agendamento_sucesso.lastname)

            const id = resposta.body.bookingid

            cy.log("Cadastrando agendamento")

            cy.request({
                method: "PATCH",
                url: `/booking/${id}`,
                headers: {
                    "cookie": `token=${token}`,
                },
                body: {
                    "lastname": "Bravos"
                }
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(200)
                    expect(resposta.body.firstname).to.equal(agendamento_sucesso.firstname)
                    expect(resposta.body.lastname).to.equal("Bravos")
                    expect(resposta.body.totalprice).to.equal(agendamento_sucesso.totalprice)
                    expect(resposta.body.bookingdates.checkin).to.equal(agendamento_sucesso.bookingdates.checkin)
                    expect(resposta.body.bookingdates.checkout).to.equal(agendamento_sucesso.bookingdates.checkout)
                    expect(resposta.body.additionalneeds).to.equal(agendamento_sucesso.additionalneeds)
                    cy.log("Agendamento alterado")
                })
        })
    });

});