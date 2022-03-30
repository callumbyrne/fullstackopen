interface BmiValues {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error("Not enough argumnets");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers");
    }
};

export const bmiCalculator = (height: number, weight: number) => {
    const bmi = weight / Math.pow(height / 100, 2);
    console.log(bmi);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal weight";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

try {
    const { height, weight } = parseBmiArguments(process.argv);
    bmiCalculator(height, weight);
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
