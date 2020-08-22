const absExercise = {
  group: "abs",
  name: "legs up machine",
  weight: 10,
  reps: 10,
  sets: 3
};

const programA = {
  name: "A",
  exercises: [
    absExercise,
    { group: "cheast", name: "benchpress", weight: 50 },
    { group: "cheast", name: "butterfly on bench", weight: 30 },
    { group: "cheast", name: "push on bench", weight: 30 },
    { group: "back arm", name: "arm spread machine" },
    { group: "back arm", name: "arm spread free", weight: 10 },
    { group: "sholders", name: "standing push bar", weight: 20 },
    { group: "sholders", name: "dumble straight", weight: 10 },
    { group: "sholders", name: "dumble side", weight: 10 }
  ]
};
const programB = {
  name: "B",
  exercises: [
    absExercise,
    { group: "legs", name: "squat", weight: 50 },
    { group: "legs", name: "tip toe", weight: 15 },
    { group: "back", name: "dead lift", weight: 100 },
    { group: "back", name: "pull up", weight: 10 },
    { group: "back", name: "bench pull up over head", weight: 30 },
    { group: "front hand", name: "standing push bar", weight: 20 },
    { group: "front hand", name: "dumble straight", weight: 10 },
    { group: "front hand", name: "dumble side", weight: 10 }
  ]
};

const plan = [programA, programB];

export default plan;
