export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patient, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};
