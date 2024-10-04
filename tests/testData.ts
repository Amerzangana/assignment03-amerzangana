import { faker } from "@faker-js/faker";
import exp from 'constants';

export const generateRoomsData = () => {
    const number = faker.number.float({ min: 10, max: 30 }).toFixed(0); 
    const floor = faker.number.int({ min: 1, max: 10 }).toString(); 
    const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 }); 
    const available = faker.datatype.boolean(); 
    const id = faker.number.int({ min: 10, max: 20 }).toString(); 
    const categoryOptions = ['Double', 'Single', 'Twin'];
    const features = faker.helpers.arrayElements(
        ['Balcony', 'Ensuite', 'Sea View', 'Penthouse'], 
        faker.number.int({ min: 1, max: 4 })
    );
    const category = faker.helpers.arrayElement(categoryOptions); 
    return {
        number,
        floor,
        price,
        available,
        features,
        category,
        id
    };
};

    export const generateBillData = () => {
        const value = faker.commerce.price({ min: 10000, max: 5000000, dec: 0 }); 
        const paid = faker.datatype.boolean(); 
        return {
            value,
            paid
        }
    };

    export const generateClientData = () => {
        const name = faker.person.fullName();
        const email = faker.internet.email(); 
        const telephone = faker.phone.number();
        return {
            name,
            email,
            telephone
        }
    };

    export const generateReservationData = () => {
        const startDate = faker.date.future()
        const endDate = faker.date.future()
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        const client = 2;
        const room = 1;
        const bill = 1;
        return {
            start: formatDate(startDate),   
            end: formatDate(endDate),
            client,
            room,
            bill
        }
    };