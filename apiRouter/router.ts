import * as t from 'io-ts'
import { route } from './route'
import { plan } from '../data/plan'
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'

export const router = {
    '/api/smoke': route({
        body: t.strict({
            bodyValue: t.string,
        }),
        query: t.strict({
            queryValue: t.literal('exactly this string'),
        }),
        response: t.strict({
            bodyValue: t.string,
            queryValue: t.string,
            numberFromString: NumberFromString,
            fromServer: t.boolean,
        }),
    }),
    '/api/plan': route({
        body: t.strict({
            username: t.string,
            program: t.number,
            startIndex: t.number,
            endIndex: t.number,
        }),
        query: t.unknown,
        response: plan,
    }),
} as const
