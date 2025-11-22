export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: 'male' | 'female' | 'other',
  occupation: string
}

export interface NewPatientRequest {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
}
