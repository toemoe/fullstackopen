import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import { Patient } from '../../types';

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo = ({ patient }: PatientInfoProps) => {
  const [fullPatient, setFullPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Проверка что метод доступен
    console.log('✅ patientService methods:', patientService);
    console.log('✅ getById type:', typeof patientService.getById);

    const fetchPatient = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching patient with ID:', patient.id);
        
        const patientData = await patientService.getById(patient.id);
        console.log('✅ Received patient data:', patientData);
        
        setFullPatient(patientData);
        setError('');
      } catch (error: any) {
        console.error('❌ Error fetching patient details:', error);
        setError(`Failed to load patient details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patient.id]);

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

      {fullPatient.entries && fullPatient.entries.length > 0 ? (
        <div>
          <h3>Entries</h3>
          {fullPatient.entries.map(entry => (
            <div key={entry.id}>
              <p><strong>{entry.date}:</strong> {entry.description}</p>
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