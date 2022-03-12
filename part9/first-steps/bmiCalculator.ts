const bmiCalculator = (height: number, weight: number): String => {
    const bmi = weight * Math.pow(height, 2);

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

console.log(bmiCalculator(180, 74));
