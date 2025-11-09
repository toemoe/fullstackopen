import express from 'express';
import PatientsService from '../services/service';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(PatientsService.getPatients());
});

export default router;