import diagnosesData from "../../data/diagnosesData";
import { DiagnosesEntry } from "../types";

const diagnoses: Array<DiagnosesEntry> = diagnosesData;

const getDiagnoses = () => {
    return diagnoses;
};

export default {
    getDiagnoses,
};
