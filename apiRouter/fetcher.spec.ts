import { fetcher } from './fetcher';
import axios from 'axios';
import { ResponseOf } from './inference';

const axiosMock: jest.Mock = axios as any;

jest.mock('axios');

test('decodes all the values', async () => {
  axiosMock.mockImplementationOnce(async () => {
    return {
      data: {
        bodyValue: 'value from body',
        queryValue: 'value from query',
        fromServer: true,
        numberFromString: '42',
      },
    };
  });

  const data = await fetcher('/api/smoke', {
    body: { bodyValue: 'hello' },
    query: { queryValue: 'exactly this string' },
  });

  const expected: ResponseOf<'/api/smoke'> = {
    bodyValue: 'value from body',
    queryValue: 'value from query',
    fromServer: true,
    numberFromString: 42,
  };

  expect(axiosMock).toHaveBeenCalledWith(
    '/api/smoke',
    expect.objectContaining({
      method: 'post',
      data: { bodyValue: 'hello' },
      params: new URLSearchParams({ queryValue: 'exactly this string' }),
    }),
  );
  expect(data).toEqual(expected);
});

test(`fails the call if response does not match the expected type`, async () => {
  axiosMock.mockImplementationOnce(async () => {
    return {
      data: {},
    };
  });
  const fetched = fetcher('/api/smoke', {
    body: { bodyValue: 'hello' },
    query: { queryValue: 'exactly this string' },
  });

  return expect(fetched).rejects.toThrow(/Can't decode client value/);
});
