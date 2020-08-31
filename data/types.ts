import * as t from 'io-ts'
import path from 'path'
import fs from 'fs-extra'

export interface Exercise {
    group: string
    name: string
    weight?: number
    reps?: number
    sets?: number
}

export interface Program {
    name: string
    exercises: Exercise[]
}

export type Plan = Program[]

export const exercise = t.exact(
    t.intersection([
        t.type({
            group: t.string,
            name: t.string,
        }),
        t.partial({
            weight: t.number,
            reps: t.number,
            sets: t.number,
        }),
    ]),
    'exercise',
)

export const program = t.strict(
    {
        name: t.string,
        exercises: t.array(exercise),
    },
    'program',
)

export const plan = t.array(program, 'plan')
