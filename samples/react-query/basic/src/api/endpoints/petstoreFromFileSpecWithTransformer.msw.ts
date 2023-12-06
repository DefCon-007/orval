/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

export const getListPetsMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() =>
    faker.helpers.arrayElement([
      {
        breed: faker.helpers.arrayElement(['Labradoodle'] as const),
        cuteness: faker.number.int({ min: undefined, max: undefined }),
        barksPerMinute: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['dog'] as const),
      },
      {
        breed: faker.helpers.arrayElement(['Dachshund'] as const),
        length: faker.number.int({ min: undefined, max: undefined }),
        barksPerMinute: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['dog'] as const),
        '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
        callingCode: faker.helpers.arrayElement([
          faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
          undefined,
        ]),
        country: faker.helpers.arrayElement([
          faker.helpers.arrayElement([
            "People's Republic of China",
            'Uruguay',
          ] as const),
          undefined,
        ]),
        email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        id: (() => faker.number.int({ min: 1, max: 99999 }))(),
        name: (() => faker.person.lastName())(),
        tag: (() => faker.person.lastName())(),
      },
      {
        petsRequested: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['cat'] as const),
        '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
        callingCode: faker.helpers.arrayElement([
          faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
          undefined,
        ]),
        country: faker.helpers.arrayElement([
          faker.helpers.arrayElement([
            "People's Republic of China",
            'Uruguay',
          ] as const),
          undefined,
        ]),
        email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        id: (() => faker.number.int({ min: 1, max: 99999 }))(),
        name: (() => faker.person.lastName())(),
        tag: (() => faker.person.lastName())(),
      },
    ]),
  );

export const getCreatePetsMock = () =>
  faker.helpers.arrayElement([
    {
      breed: faker.helpers.arrayElement(['Labradoodle'] as const),
      cuteness: faker.number.int({ min: undefined, max: undefined }),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog'] as const),
    },
    {
      breed: faker.helpers.arrayElement(['Dachshund'] as const),
      length: faker.number.int({ min: undefined, max: undefined }),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog'] as const),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          "People's Republic of China",
          'Uruguay',
        ] as const),
        undefined,
      ]),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
    },
    {
      petsRequested: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['cat'] as const),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          "People's Republic of China",
          'Uruguay',
        ] as const),
        undefined,
      ]),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
    },
  ]);

export const getUpdatePetsMock = () =>
  faker.helpers.arrayElement([
    {
      breed: faker.helpers.arrayElement(['Labradoodle'] as const),
      cuteness: faker.number.int({ min: undefined, max: undefined }),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog'] as const),
    },
    {
      breed: faker.helpers.arrayElement(['Dachshund'] as const),
      length: faker.number.int({ min: undefined, max: undefined }),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog'] as const),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          "People's Republic of China",
          'Uruguay',
        ] as const),
        undefined,
      ]),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
    },
    {
      petsRequested: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['cat'] as const),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33'] as const),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement([
          "People's Republic of China",
          'Uruguay',
        ] as const),
        undefined,
      ]),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
    },
  ]);

export const getShowPetByIdMock = () =>
  (() => ({
    id: faker.number.int({ min: 1, max: 99 }),
    name: faker.person.firstName(),
    tag: faker.helpers.arrayElement([faker.word.sample(), void 0]),
  }))();

export const getSwaggerPetstoreMock = () => [
  http.get('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getListPetsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getCreatePetsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.put('*/v:version/pets', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getUpdatePetsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/v:version/pets/:petId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getShowPetByIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
