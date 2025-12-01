import { useState, useEffect } from 'react';
import diagnosesService from "../../services/diagnoses";
import patientService from '../../services/patients';
import { Patient, Diagnosis } from '../../types';

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo = ({ patient }: PatientInfoProps) => {
  const [fullPatient, setFullPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);    
        const patientData = await patientService.getById(patient.id);
        const diagnosesData = await diagnosesService.getAll();
        setFullPatient(patientData);
        setDiagnoses(diagnosesData);
        setError('');
      } catch (error) {
        setError(`Failed to load patient or diagnoses`);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patient.id]);

  const getDiagnoses = (code: string) => {
    const diag = diagnoses.find(d => d.code === code);
    return diag ? diag.name : code;
  };

  if (loading) return <div>Loading patient details...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!fullPatient) return <div>No patient data found</div>;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {fullPatient.name}</p>
      <p><strong>Date of Birth:</strong> {fullPatient.dateOfBirth}</p>
      <p><strong>Gender:</strong> {fullPatient.gender}</p>
      <p><strong>SSN:</strong> {fullPatient.ssn}</p>
      <p><strong>Occupation:</strong> {fullPatient.occupation}</p>

      {fullPatient.entries?.length ? (
        <div>
          <h3>Entries</h3>
          {fullPatient.entries.map(entry => (
            <div key={entry.id}>
              <p><strong>{entry.date}:</strong> {entry.description}</p>
              {"diagnosisCodes" in entry && entry.diagnosisCodes?.length ? (
                <ul>
                  {entry.diagnosisCodes.map(code => (
                    <li key={code}>{code} — {getDiagnoses(code)}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p>No entries found</p>
      )}
    </div>
  );
};

export default PatientInfo;