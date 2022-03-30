import express from "express";
const app = express();

import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        res.status(400).send({ error: "Missing parameter height or weight" });
    }

    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (isNaN(heightNumber) || isNaN(weightNumber)) {
        res.status(400).send({ error: "malformatted parameters" });
    }

    const results: { height: number; weight: number; bmi: string } = {
        weight: weightNumber,
        height: heightNumber,
        bmi: bmiCalculator(heightNumber, weightNumber),
    };
    res.json(results);
});

app.post("/exercises", (req, res) => {
    console.log(req.body);
    const exercisesArray = req.body.daily_exercises;
    const target = req.body.target;

    if (!exercisesArray || !target) {
        res.status(400).send({
            error: "Missing parameter daily exercises or target",
        });
    } else if (exercisesArray.some(isNaN) || isNaN(target)) {
        res.status(400).send({ error: "malformatted parameters" });
    }

    const result = calculateExercises(exercisesArray, target);
    res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
