/// <reference types="cypress" /> 


const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")
const agendamento_insucesso = require("../fixtures/agendamento_insucesso_payload.json")
const cadastro_payload = require("../fixtures/gera_dados")

describe('Cadastrar agendamento', () => {

    let payload
    beforeEach(() => {
        payload = cadastro_payload.geraCadastroAgendamento()
    })

    it('Deve cadastrar agendamento com sucesso', () => {

        cy.request({
            method: "POST",
            url: "/booking",
            body: payload,
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(200)
                expect(resposta.body.bookingid).not.NaN
                expect(resposta.body.bookingid).to.greaterThan(0)
                expect(resposta.body.booking.firstname).to.equal(payload.firstname)
                expect(resposta.body.booking.lastname).to.equal(payload.lastname)
                expect(resposta.body.booking.totalprice).to.equal(payload.totalprice)
                expect(resposta.body.booking.depositpaid).to.equal(payload.depositpaid)
                expect(resposta.body.booking.bookingdates.checkin).to.equal(payload.bookingdates.checkin)
                expect(resposta.body.booking.bookingdates.checkout).to.equal(payload.bookingdates.checkout)
                expect(resposta.body.booking.additionalneeds).to.equal(payload.additionalneeds)
            })
    });

    it('Não deve cadastrar agendamento com nome passando inteiro', () => {

        cy.request({
            method: "POST",
            url: "/booking",
            body: agendamento_insucesso,
            failOnStatusCode: false,
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(500)
            })
    });

});