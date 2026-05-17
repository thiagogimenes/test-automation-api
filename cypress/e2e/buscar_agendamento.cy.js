/// < reference types="cypress"/>

describe('Buscar agendamento', () => {
    
    it('Buscar agendamento com sucesso', () => {
        
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/12",
        })
        .then((resposta) => {
            expect(resposta.status).to.equal(200)
            expect(resposta.body.firstname).to.equal("John")
            expect(resposta.body.lastname).to.equal("Smith")
            expect(resposta.body.totalprice).to.equal(111)
            expect(resposta.body.bookingdates.checkin).to.equal("2018-01-01")
            expect(resposta.body.bookingdates.checkout).to.equal("2019-01-01")
            expect(resposta.body.additionalneeds).to.equal("Breakfast")
        })
    });

    it('Buscar agendamento inexistente', () => {
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