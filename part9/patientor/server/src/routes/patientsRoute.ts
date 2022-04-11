/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
    const result = patientsService.getPatientsOmitSsn();
    res.send(result);
});

router.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient = patientsService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    });
    res.json(newPatient);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = patientsService.getPatient(id);

    res.send(patient);
});

export default router;
