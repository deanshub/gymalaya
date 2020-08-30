import * as t from 'io-ts'
import { NextApiHandler } from 'next'
import { isLeft } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { router } from './router'
import { ApiRoutes } from './inference'
import { ServerCallback } from './types'

/**
 * Serve an API endpoint for a given route.
 * This is fully type safe using `./router.ts` and `io-ts`.
 */
export function serve<Route extends keyof ApiRoutes>(
    routeName: Route,
    callback: ServerCallback<ApiRoutes[Route]>,
): NextApiHandler {
    const route = router[routeName]
    const body = route.body as any
    const query = route.query as any

    return async (req, res) => {
        const type = t.type({
            body: body ?? t.unknown,
            query: query ?? t.unknown,
        })
        const decoded = type.decode({
            body: req.body,
            query: req.query,
        })

        if (isLeft(decoded)) {
            const paths = PathReporter.report(decoded)
            return res.status(400).send({ errors: paths, successful: false })
        }

        const result = await callback(decoded.right as any)
        const response = route.response.encode(result as any)
        res.status(200).send(response)
    }
}
