import express from 'express';
import DiagnosesServise from '../services/service';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(DiagnosesServise.getDiagnoses());
});

export default router;