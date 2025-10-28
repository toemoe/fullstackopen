

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height/100) * (height/100))
  if (result < 18.5) {
    return "Underweight"
  } else if (result >= 18.5 && result <= 24.9) {
    return "Normal range"
  } else if (result >= 25 && result <= 29.9) {
    return "Overweight"
  } else if (result >= 30 && result <= 34.9) {
    return "Obese Class I (Moderately obese)"
  } else if (result >= 35 && result <= 39.9) {
    return "Obese Class II (Severely obese)"
  } else return "Obese Class III (Very severely obese)"
}

const parseArgumentsBmi = (args: string[]): { height: number, weight: number } => {
  if (args.length !== 4) throw new Error('Not enough arguments')

    const height = Number(args[2])
    const weight = Number(args[3])

    if (isNaN(height) && isNaN(weight)) {
      throw new Error('Provided values were not numbers!')
    }

    return { height, weight }
};

try {
  const { height, weight } = parseArgumentsBmi(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e: unknown) {
  console.log('Error, something bad happened, message: ', e)
}