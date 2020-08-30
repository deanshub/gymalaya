import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

/**
 * Tries to parse `body` with the given `decoder`
 * if it fails, logs a descriptive error to the logger
 * and throws it.
 */
export function parseBody<Decoder extends t.Any>(
    decoder: Decoder,
    body: unknown,
): t.TypeOf<Decoder> {
    const decoded = decoder.decode(body)
    if (decoded._tag === 'Left') {
        const errors = PathReporter.report(decoded).join('\n\n')
        throw new Error(`Can't decode client value:\n\n${errors}`)
    }
    return decoded.right
}
