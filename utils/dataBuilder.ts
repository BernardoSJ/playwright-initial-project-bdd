import { faker } from '@faker-js/faker';

export function buildCustomer() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zip: faker.location.zipCode(),
  };
}

export const customerDataSet = Array.from({ length: 5 }, () => buildCustomer());
