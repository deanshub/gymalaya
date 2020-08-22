import styles from './Exercise.module.scss'
// function Group({ group, exercises, name, weight, even = false }) {
//   return (
//     <>
//       {exercises.map((exercise, index) => (
//         <Exercise
//           {...exercise}
//           group={group}
//           exercisesInGroup={index === 0 ? exercises.length : undefined}
//           even={even}
//         />
//       ))}
//     </>
//   );
// }

// {exercisesInGroup && <td rowSpan={exercisesInGroup}>{group}</td>}
export function Exercise({
    group,
    name,
    weight = 0,
    even = false,
    reps = 1,
    sets = 1,
}) {
    return (
        <tr className={styles.row}>
            <td className={styles.capitalize}>{group}</td>
            <td className={styles.capitalize}>{name}</td>
            <td className={styles.centerText}>{`${reps}`}</td>
            <td className={styles.centerText}>{`${sets}`}</td>
            <td className={styles.centerText}>{`${weight}`}Kg</td>
        </tr>
    )
}
