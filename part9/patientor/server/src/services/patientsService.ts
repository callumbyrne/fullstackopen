import patientsData from "../../data/patientsData";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientsData;

const getPatients = () => {
    return patients;
};

const getPatientsOmitSsn = (): Omit<Patient, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatientsOmitSsn,
    addPatient,
};
