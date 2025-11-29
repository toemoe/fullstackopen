import diagnosesData from '../data/diagnosticsData';
import patientsData from '../data/patientsData';
import { Patient } from '../types/types';

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

export default {
  getDiagnoses,
  getPatients,
  addPatient,
  getPatientInfo,
};