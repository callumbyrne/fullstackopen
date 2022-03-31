import patientsData from "../../data/patientsData";
import { PatientEntry } from "../types";

const patients: Array<PatientEntry> = patientsData;

const getPatients = () => {
    return patients;
};

const getPatientsOmitSsn = (): Omit<PatientEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getPatients,
    getPatientsOmitSsn,
};
