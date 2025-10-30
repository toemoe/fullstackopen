interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "You're doing great!";
  } else if (average >= target * 0.7) {
    rating = 2;
    ratingDescription = "Not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You can do better!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgumentsExercises = (args: string[]): { target: number; hours: number[] } => {
  if (args.length < 4) {
    throw new Error("Usage: npm run calculateExercises <target> <dailyHours...>");
  }

  const target = Number(args[2]);
  const hours = args.slice(3).map(Number);

  if (isNaN(target) || hours.some(isNaN)) {
    throw new Error("All provided values must be numbers!");
  }

  return { target, hours };
};


if (require.main === module) {
  try {
    const { target, hours } = parseArgumentsExercises(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (e: unknown) {
    let errorMessage = "Error: ";
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    console.log(errorMessage);
  }
}