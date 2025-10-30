import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

// app.get('/ping', (_req, res) => {
//   res.send('pong');
// });

app.get('/bmi', (req: express.Request, res: express.Response): void => {
  try {
    if (!req.query.height || !req.query.weight) {
      res.status(400).json({ error: 'malformatted parameters' });
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



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});