import express, { Response, Request } from 'express';
import PatientsService from '../services/service';
import { v1 as uuid } from 'uuid';
import { NewPatientRequest, Patient } from '../types/types';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(PatientsService.getPatients());
});

router.post('/', (req: Request<unknown, unknown, NewPatientRequest>, res: Response) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;

    if (!name || !dateOfBirth || !gender || !occupation) {
      return res.status(400).send({ error: 'Patient is not valid' });
    }
    const newPatient: Patient = { id: uuid() as string, name, dateOfBirth, ssn, gender, occupation };
    PatientsService.addPatient(newPatient);

    return res.status(201).json(newPatient);
  } catch (err: unknown) {
    let errorMessage = 'Patient is not valid';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).send({ error: errorMessage });
  }  
});

export default router;