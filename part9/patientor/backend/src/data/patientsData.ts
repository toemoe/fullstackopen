import { Patient } from "../types/types";

const patients: Patient[] = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
    entries: [
      {
        id: "e1",
        type: "HealthCheck",
        description: "Routine yearly control",
        date: "2024-02-01",
        specialist: "Dr. House",
        healthCheckRating: 1,
        diagnosisCodes: ["M24.2", "J10.1"]
      }
    ]
  },

  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
    entries: [
      {
        id: "e2",
        type: "OccupationalHealthcare",
        description: "Work accident",
        date: "2024-03-14",
        specialist: "Dr. Grey",
        employerName: "LAPD",
        sickLeave: {
          startDate: "2024-03-15",
          endDate: "2024-03-25"
        },
        diagnosisCodes: ["S03.5", "S62.5"]
      }
    ]
  },

  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "other",
    occupation: "Technician",
    entries: [
      {
        id: "e3",
        type: "Hospital",
        description: "Emergency surgery",
        date: "2024-01-12",
        specialist: "Dr. Strange",
        discharge: {
          date: "2024-01-20",
          criteria: "Patient stable"
        },
        diagnosisCodes: ["M51.2", "F43.2"]
      }
    ]
  },

  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
    entries: [
      {
        id: "e4",
        type: "HealthCheck",
        description: "Annual checkup",
        date: "2024-04-03",
        specialist: "Dr. Who",
        healthCheckRating: 0,
        diagnosisCodes: ["H54.7"]
      },
      {
        id: "e5",
        type: "OccupationalHealthcare",
        description: "Exposure to unknown substance",
        date: "2024-04-10",
        specialist: "Dr. Who",
        employerName: "FBI",
        diagnosisCodes: ["Z57.1"]
      }
    ]
  },

  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
    entries: [
      {
        id: "e6",
        type: "Hospital",
        description: "Treatment for acute cystitis",
        date: "2024-05-05",
        specialist: "Dr. House",
        discharge: {
          date: "2024-05-10",
          criteria: "Patient recovered"
        },
        diagnosisCodes: ["N30.0"]
      }
    ]
  }
];

export default patients;
