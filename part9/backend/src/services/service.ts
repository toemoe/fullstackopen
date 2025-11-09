import diagnosesData from '../data/diagnosticsData';
import patientsData from '../data/patientsData';

const getDiagnoses = () => {
  return diagnosesData;
};

const getPatients = () => {
  return patientsData;
};

export default {
  getDiagnoses,
  getPatients
};