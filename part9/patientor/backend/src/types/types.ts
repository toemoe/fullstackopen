export interface Entry {
  id: string;
  type: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export interface NewPatientRequest {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: 'male' | 'female' | 'other';
  occupation: string;
}
