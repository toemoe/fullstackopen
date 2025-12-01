import diagnosesData from '../data/diagnosticsData';
import patientsData from '../data/patientsData';
import { Patient, Entry } from '../types/types';

const getDiagnoses = () => {
  return diagnosesData;
};

const getPatients = () => {
  return patientsData;
};

const getPatientInfo = (id: string) => {
  return patientsData.find((user) => user.id === id);
};

const addPatient = (patient: Patient): Patient => {
  patientsData.push(patient);
  return patient;
};

const addEntryToPatient = (patientId: string, entry: Entry): Patient => {
  const patientIndex = patientsData.findIndex(p => p.id === patientId);
  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }
  patientsData[patientIndex].entries.push(entry);
  return patientsData[patientIndex];
};

export default {
  getDiagnoses,
  getPatients,
  addPatient,
  getPatientInfo,
  addEntryToPatient
};