interface ExerciseValues {
    array: Array<number>;
    target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough argumnets");
    const array = args.slice(3).map(Number);

    if (!isNaN(Number(args[2])) && !array.some(isNaN)) {
        return {
            array: array,
            target: Number(args[2]),
        };
    } else {
        throw new Error("Provided values were not numbers");
    }
};

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (
    array: Array<number>,
    target: number
): Result => {
    const numberOfDays = array.length;
    const numberOfTrainingDays = array.filter((a) => a !== 0).length;
    const targetValue = target;
    const averageTime = array.reduce((a, b) => a + b, 0) / array.length;
    const targetReached = averageTime >= targetValue ? true : false;
    let rating;
    let ratingExplanation;

    if (averageTime < targetValue) {
        rating = 1;
        ratingExplanation = "bad";
    } else if (averageTime === targetValue) {
        rating = 2;
        ratingExplanation = "good";
    } else {
        rating = 3;
        ratingExplanation = "great";
    }

    return {
        periodLength: numberOfDays,
        trainingDays: numberOfTrainingDays,
        success: targetReached,
        rating: rating,
        ratingDescription: ratingExplanation,
        target: targetValue,
        average: averageTime,
    };
};

try {
    const { array, target } = parseArguments(process.argv);
    console.log(calculateExercises(array, target));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
