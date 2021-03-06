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
    entries: Entry[];
}

export type NewPatient = Omit<Patient, "id" | "entries">;

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
