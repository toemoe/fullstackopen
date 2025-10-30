import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
  res.send('pong');
});

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.get('/bmi', (req: express.Request, res: express.Response): void => {
  try {
    if (!req.query.height || !req.query.weight) {
      res.status(400).json({ error: 'parameters missing' });
      return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
});


app.post('/exercises', (req: express.Request<Record<string, never>, Record<string, never>, ExerciseRequest>, res: express.Response) => {
  try {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
      res.status(400).json({ error: 'parameters missing' });
      return;
    }

    const dailyEx: number[] = daily_exercises.map(Number);
    const targetEx: number = Number(target);
    if (dailyEx.some(isNaN) || isNaN(targetEx)) {
      res.status(400).json({ error: 'malformatted parameters'});
      return;
    }
    const result = calculateExercises(dailyEx, targetEx);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal server error' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});