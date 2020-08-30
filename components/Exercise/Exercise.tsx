import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import styles from './Exercise.module.scss'

export function Exercise({
    group,
    name,
    weight = 0,
    reps = 1,
    sets = 1,
    index,
}) {
    return (
        <Draggable
            draggableId={`${group}.${name}`.replace(/ /g, '-')}
            index={index}
        >
            {(provided: DraggableProvided) => (
                <tr
                    className={styles.row}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <td className={styles.capitalize}>{group}</td>
                    <td className={styles.capitalize}>{name}</td>
                    <td className={styles.centerText}>{`${reps}`}</td>
                    <td className={styles.centerText}>{`${sets}`}</td>
                    <td className={styles.centerText}>{`${weight}`}Kg</td>
                </tr>
            )}
        </Draggable>
    )
}
