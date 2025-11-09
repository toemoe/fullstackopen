import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors() as express.RequestHandler);
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientsRouter);

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});