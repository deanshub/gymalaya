import { router } from './router'
import { ApiRoutes } from './inference'
import * as t from 'io-ts'
import axios, { AxiosRequestConfig } from 'axios'
import { parseBody } from './parseBody'
import { ClientRequestArguments } from './types'

const axiosCfg: AxiosRequestConfig = {
    baseURL: '/',
    // process.env.NODE_ENV === 'production'
    //     ? 'https://bo.wix.com/performance-stats/'
    //     : process.env.PORT
    //     ? `http://localhost:${process.env.PORT}/`
    //     : '/',
}

function getQueryParams<RouteName extends keyof ApiRoutes>(
    routeName: RouteName,
    data: ClientRequestArguments<ApiRoutes[RouteName]>,
): URLSearchParams {
    const route = router[routeName]
    const query = route.query.encode((data as any).query)
    return new URLSearchParams(query as any)
}

/**
 * Calls an endpoint in a type safe manner using `./router.ts` definitions.
 * It works both in a server context and in a client context.
 */
export async function fetcher<RouteName extends keyof ApiRoutes>(
    routeName: RouteName,
    data: ClientRequestArguments<ApiRoutes[RouteName]>,
): Promise<t.TypeOf<ApiRoutes[RouteName]['response']>> {
    const route = router[routeName]
    const response = await axios(routeName, {
        ...axiosCfg,
        method: route.body === t.unknown ? 'get' : 'post',
        params: getQueryParams(routeName, data),
        data: route.body.encode((data as any).body),
    })
    return parseBody(route.response, response.data)
}
