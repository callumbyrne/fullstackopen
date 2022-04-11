import patientsData from "../../data/patientsData";
import { Patient, NewPatient, PublicPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientsData;

const getPatients = () => {
    return patients;
};

const getPatientsOmitSsn = (): PublicPatient[] => {
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
        entries: [],
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id);
};

export default {
    getPatient,
    getPatients,
    getPatientsOmitSsn,
    addPatient,
};
