/// <reference types="cypress"/>

const agendamento_sucesso = require("../fixtures/agendamento_sucesso_payload.json")

describe('Buscar agendamento', () => {

    it('Deve buscar agendamento com sucesso', () => {

        cy.request({
            method: "POST",
            url: "https://restful-booker.herokuapp.com/booking",
            body: agendamento_sucesso,
        }).then((resposta) => {
            expect(resposta.status).to.equal(200)

            const id = resposta.body.bookingid

            cy.request({
                method: "GET",
                url: `https://restful-booker.herokuapp.com/booking/${id}`,
            })
                .then((resposta) => {
                    expect(resposta.status).to.equal(200)
                    expect(resposta.body.firstname).to.equal(agendamento_sucesso.firstname)
                    expect(resposta.body.lastname).to.equal(agendamento_sucesso.lastname)
                    expect(resposta.body.totalprice).to.equal(agendamento_sucesso.totalprice)
                    expect(resposta.body.bookingdates.checkin).to.equal(agendamento_sucesso.bookingdates.checkin)
                    expect(resposta.body.bookingdates.checkout).to.equal(agendamento_sucesso.bookingdates.checkout)
                    expect(resposta.body.additionalneeds).to.equal(agendamento_sucesso.additionalneeds)
                })
        })
    });

    it('Não deve buscar agendamento inexistente', () => {
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/xpto",
            failOnStatusCode: false,
        })
            .then((resposta) => {
                expect(resposta.status).to.equal(404)
            })
    });
});