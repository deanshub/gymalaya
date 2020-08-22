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
  sets = 1
}) {
  return (
    <tr className={even ? "evenGroup" : "oddGroup"}>
      <td>{group}</td>
      <td>{name}</td>
      <td>{`${reps}`}</td>
      <td>{`${sets}`}</td>
      <td>{`${weight}`}Kg</td>
    </tr>
  );
}
