import type * as t from 'io-ts';
import { clone } from 'io-ts-types/lib/clone';

export interface AnyRoute {
  query: t.Type<any, Record<string, string>> | t.UnknownType;
  body: t.Type<any, Record<string, any>> | t.UnknownType;
  response: t.Any;
}

export function route<X extends AnyRoute>(x: X): X {
  return {
    ...x,
    body: withName(x.body, 'body'),
    query: withName(x.query, 'query'),
    response: withName(x.response, 'response'),
  };
}

/** Changes the name of a decoder, so it'll be nicer to read in the errors */
function withName<T extends t.Type<any>>(decoder: T, name: string): T {
  const newDecoder = clone(decoder);
  (newDecoder as any).name = name;
  return newDecoder;
}
