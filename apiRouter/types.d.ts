import * as t from 'io-ts'

export interface AnyRoute {
    query: t.Type<any, Record<string, string>> | t.UnknownType
    body: t.Type<any, Record<string, any>> | t.UnknownType
    response: t.Any
}

type ClientQueryArgs<X extends AnyRoute> = [X['query']] extends [t.UnknownType]
    ? unknown
    : { query: t.TypeOf<Extract<X['query'], t.Any>> }

type ClientBodyArgs<X extends AnyRoute> = [X['body']] extends [t.UnknownType]
    ? unknown
    : { body: t.TypeOf<Extract<X['body'], t.Any>> }

export type ClientRequestArguments<X extends AnyRoute> = {} & ClientQueryArgs<
    X
> &
    ClientBodyArgs<X>

export type ServerCallback<X extends AnyRoute> = (
    args: ClientRequestArguments<X>,
) => Promise<t.TypeOf<X['response']>>
