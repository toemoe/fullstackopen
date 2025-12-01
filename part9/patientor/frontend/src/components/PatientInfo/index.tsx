import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Patient, Diagnosis } from "../../types";

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo = ({ patient }: PatientInfoProps) => {
  const [fullPatient, setFullPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const patientData = await patientService.getById(patient.id);
        const diagnosesData = await diagnosesService.getAll();
        setFullPatient(patientData);
        setDiagnoses(diagnosesData);
        setError("");
      } catch {
        setError("Failed to load patient or diagnoses");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patient.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!fullPatient) return <div>No patient data</div>;

  return (
    <div>
      <h2>{fullPatient.name}</h2>
      <p><strong>Date of Birth:</strong> {fullPatient.dateOfBirth}</p>
      <p><strong>Gender:</strong> {fullPatient.gender}</p>
      <p><strong>Occupation:</strong> {fullPatient.occupation}</p>

      <h3>Entries</h3>
      {fullPatient.entries && fullPatient.entries.length > 0 ? (
        fullPatient.entries.map(entry => (
          <div key={entry.id} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>{entry.date}:</strong> {entry.description}
            </p>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <ul>
                {entry.diagnosisCodes.map(code => {
                  const diag = diagnoses.find(d => d.code === code);
                  return (
                    <li key={code}>
                      {code} {diag ? `- ${diag.name}` : ""}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No entries</p>
      )}
    </div>
  );
};

export default PatientInfo;
