import express, { Response, Request } from 'express';
import PatientsService from '../services/service';
import { v1 as uuid } from 'uuid';
import { NewEntry, Patient } from '../types/types';
import { NewPatientSchema, NewPatientRequest, EntrySchema, Entry } from '../types/validation';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(PatientsService.getPatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const patient = PatientsService.getPatientInfo(req.params.id);

  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  return res.json(patient);
});

router.post('/', (req: Request<unknown, unknown, NewPatientRequest>, res: Response) => {
  try {
    const parseResult = NewPatientSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ error: 'Patient is not valid' });
    }    

    const { name, dateOfBirth, ssn, gender, occupation } = parseResult.data;

    const newPatient: Patient = { id: uuid(), name, dateOfBirth, ssn, gender, occupation, entries: [] };

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

router.post('/:id/entries', (req: Request<{ id: string }, unknown, NewEntry>, res) => {
  try {
    const patient = PatientsService.getPatientInfo(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found '});
      const parseResult = EntrySchema.safeParse(req.body);
    if (!parseResult.success) return res.status(404).json({ error: 'Invalid entry data'});

    const entryData = parseResult.data;

    const newEntry: Entry = {
      ...entryData,
      id: uuid()
    };

    PatientsService.addEntryToPatient(req.params.id, newEntry);

    const updatePatient = PatientsService.getPatientInfo(req.params.id);

    return res.status(201).json(updatePatient);
  } catch (err: unknown) {
    let errorMessage = 'Failed to add entry';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

export default router;