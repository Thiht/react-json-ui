import { JSONUI, listKeys } from '.'

describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(JSONUI).toBeTruthy()
  })
})

describe('listKeys', () => {
  const obj = {
    a: 3,
    b: null,
    c: {
      a: 10,
      b: [1, 2, 3],
      c: {
        a: 3,
      },
      d: [
        {
          a: 1,
        },
        {
          b: true,
        },
      ],
    },
  }
  expect(listKeys(obj)).toEqual([
    'a',
    'b',
    'c',
    'c.a',
    'c.b',
    'c.c',
    'c.c.a',
    'c.d',
    'c.d.a',
    'c.d.b',
  ])
})
