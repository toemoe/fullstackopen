import express, { Response, Request } from 'express';
import PatientsService from '../services/service';
import { v1 as uuid } from 'uuid';
import { Patient } from '../types/types';
import { NewPatientSchema, NewPatientRequest } from '../types/validation';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(PatientsService.getPatients());
});

router.post('/', (req: Request<unknown, unknown, NewPatientRequest>, res: Response) => {
  try {
    const parseResult = NewPatientSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ error: 'Patient is not valid' });
    }    

    const { name, dateOfBirth, ssn, gender, occupation } = parseResult.data;

    const newPatient: Patient = { id: uuid(), name, dateOfBirth, ssn, gender, occupation };

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