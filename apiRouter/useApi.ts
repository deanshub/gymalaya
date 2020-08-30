import useSWR, { responseInterface, ConfigInterface } from 'swr';
import { router } from './router';
import type {
  ResponseOf,
  SerializableResponseOf,
  GetRoutePaths,
  GetRoutes,
} from './inference';
import { AxiosError } from 'axios';
import { parseBody } from './parseBody';
import { fetcher } from './fetcher';
import React from 'react';
import type { ClientRequestArguments } from './types';

/**
 * like `useSWR` by https://swr.now.sh, but type safe using `./router.ts` definitions.
 * It uses `./fetcher.ts` under the hood.
 */
export function useApi<RouteName extends GetRoutePaths>(
  routeName: RouteName,
  data: ClientRequestArguments<GetRoutes[RouteName]>,
  config?: ConfigInterface<
    SerializableResponseOf<RouteName>,
    AxiosError | Error
  >,
): responseInterface<ResponseOf<RouteName>, AxiosError | Error> {
  const route = router[routeName];
  const query = route.query.encode((data as any).query);
  const querystring = new URLSearchParams(query as any);
  const initialData = React.useMemo(() => {
    return config?.initialData && parseBody(route.response, config.initialData);
  }, [config?.initialData]);
  const swr = useSWR(
    [routeName, querystring.toString()],
    async () => {
      const response = await fetcher(routeName, data);
      return parseBody(route.response, response);
    },
    { ...config, initialData } as any,
  );
  return swr;
}
