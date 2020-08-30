import { serve } from './serve';
import { factory } from '../utils';
import { NextApiRequest, NextApiResponse } from 'next';

const route = serve('/api/smoke', async (data, _ctx) => {
  return {
    bodyValue: data.body.bodyValue,
    queryValue: data.query.queryValue,
    fromServer: true,
    numberFromString: 42,
  };
});

const createRequest = factory<NextApiRequest>({
  body: null,
  query: {},
});
const createResponse = factory<NextApiResponse>({});

test('stops a malformed request: no body, no query', async () => {
  const request = createRequest();
  const response = createResponse({
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  });
  await route(request, response);
  expect(response.status).toHaveBeenCalledWith(400);
});

test('stops a malformed request: query not in the correct format', async () => {
  const request = createRequest({
    body: { bodyValue: 'Hello' },
    query: { queryValue: 'will fail (because it expects a literal string)' },
  });
  const response = createResponse({
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  });
  await route(request, response);
  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.send).toHaveBeenCalledWith({
    successful: false,
    errors: [expect.stringContaining('query/queryValue')],
  });
});

test('stops a malformed request: body has invalid data types', async () => {
  const request = createRequest({
    body: { bodyValue: { thisWill: 'fail because we expect it to be string' } },
    query: { queryValue: 'exactly this string' },
  });
  const response = createResponse({
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  });
  await route(request, response);
  expect(response.status).toHaveBeenCalledWith(400);
  expect(response.send).toHaveBeenCalledWith({
    successful: false,
    errors: [expect.stringContaining('body/bodyValue')],
  });
});

test('decodes the values', async () => {
  const request = createRequest({
    body: { bodyValue: 'Hello' },
    query: { queryValue: 'exactly this string' },
  });
  const response = createResponse({
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  });
  await route(request, response);
  expect(response.status).toHaveBeenCalledWith(200);
  expect(response.send).toHaveBeenCalledWith({
    bodyValue: 'Hello',
    queryValue: 'exactly this string',
    fromServer: true,
    numberFromString: '42',
  });
});
