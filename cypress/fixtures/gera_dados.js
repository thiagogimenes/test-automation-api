import { faker } from '@faker-js/faker'

export function geraCadastroAgendamento(params) {
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 100, max: 1000 }),
        depositpaid: true,
        bookingdates: {
            checkin: faker.date.future().toISOString().split('T')[0],
            checkout: faker.date.future().toISOString().split('T')[0]
        },
        additionalneeds: faker.lorem.sentences(2),
    }
}