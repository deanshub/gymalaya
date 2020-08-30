import React from 'react'
import styles from './Program.module.scss'
import { Exercise } from '../Exercise'
import {
    Droppable,
    DragDropContext,
    DroppableProvided,
    DropResult,
} from 'react-beautiful-dnd'
import { Exercise as ExerciseType } from '../../data/plan'
import { fetcher } from '../../apiRouter/fetcher'

export function Program({ name, exercises, index }) {
    const updatePlan = React.useCallback(
        async (username: string, startIndex: number, endIndex: number) => {
            const changed = await fetcher('/api/plan', {
                body: {
                    username,
                    program: index,
                    startIndex,
                    endIndex,
                },
            })
            console.log(changed[index])
        },
        [],
    )

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return
        }

        if (result.destination.index === result.source.index) {
            return
        }

        // console.log(result)
        updatePlan('dean', result.source.index, result.destination.index)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan={5}>{name}</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>Group</th>
                        <th rowSpan={2}>Exercise</th>
                        <th colSpan={3}>Power</th>
                    </tr>
                    <tr>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <Droppable droppableId={name}>
                    {(provided: DroppableProvided) => (
                        <tbody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {exercises.map(
                                (exercise: ExerciseType, index: number) => (
                                    <Exercise
                                        {...exercise}
                                        index={index}
                                        key={`${exercise.group}.${exercise.name}`.replace(
                                            / /g,
                                            '-',
                                        )}
                                    />
                                ),
                            )}
                            {provided.placeholder}
                        </tbody>
                    )}
                </Droppable>
            </table>
        </DragDropContext>
    )
}
