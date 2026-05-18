/// <reference types="cypress" /> 

const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")
const agendamento_insucesso = require("../fixtures/agendamento_insucesso_payload.json")

describe('Cadastrar agendamento', () => {

    it('Deve cadastrar agendamento com sucesso', () => {

        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking",
            body: agendamento_sucesso,
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(200)
                expect(resposta.body.bookingid).not.NaN
                expect(resposta.body.bookingid).to.greaterThan(0)
                expect(resposta.body.booking.firstname).to.equal(agendamento_sucesso.firstname)
                expect(resposta.body.booking.lastname).to.equal(agendamento_sucesso.lastname)
                expect(resposta.body.booking.totalprice).to.equal(agendamento_sucesso.totalprice)
                expect(resposta.body.booking.depositpaid).to.equal(agendamento_sucesso.depositpaid)
                expect(resposta.body.booking.bookingdates.checkin).to.equal(agendamento_sucesso.bookingdates.checkin)
                expect(resposta.body.booking.bookingdates.checkout).to.equal(agendamento_sucesso.bookingdates.checkout)
                expect(resposta.body.booking.additionalneeds).to.equal(agendamento_sucesso.additionalneeds)
            })
    });

    it('Não deve cadastrar agendamento com nome passando inteiro', () => {
      
        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking",
            body: agendamento_insucesso,
            failOnStatusCode: false,
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(500)
            })
    });

});