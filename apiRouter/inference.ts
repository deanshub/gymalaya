import * as t from 'io-ts';
import { router } from './router';

/**
 * The *serializable* response type of a given endpoint
 */
export type SerializableResponseOf<T extends keyof ApiRoutes> = t.OutputOf<
  ApiRoutes[T]['response']
>;

/**
 * The response type of a given endpoint
 */
export type ResponseOf<T extends keyof ApiRoutes> = t.TypeOf<
  ApiRoutes[T]['response']
>;

export type ApiRoutes = typeof router;

/**
 * All the GET routes in the API router
 */
export type GetRoutePaths = {
  [key in keyof ApiRoutes]: ApiRoutes[key]['body'] extends t.UnknownType
    ? key
    : never;
}[keyof ApiRoutes];

export type GetRoutes = { [key in GetRoutePaths]: ApiRoutes[key] };

export function encodeResponse<X extends keyof ApiRoutes>(
  routeName: X,
  value: t.TypeOf<ApiRoutes[X]['response']>,
): t.OutputOf<ApiRoutes[X]['response']> {
  return router[routeName].response.encode(value as any);
}

export function decodeResponse<X extends keyof ApiRoutes>(
  routeName: X,
  value: unknown,
) {
  return router[routeName].response.decode(value);
}
