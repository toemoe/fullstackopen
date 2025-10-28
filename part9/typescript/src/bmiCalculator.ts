

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

console.log(calculateBmi(180, 74))