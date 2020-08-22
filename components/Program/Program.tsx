import styles from './Program.module.scss'
import { Exercise } from '../Exercise'

export function Program({ name, exercises }) {
    return (
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
            <tbody>
                {exercises.map((exercise, index) => (
                    <Exercise
                        {...exercise}
                        even={index % 2 === 1}
                        key={exercise.name}
                    />
                ))}
            </tbody>
        </table>
    )
}
