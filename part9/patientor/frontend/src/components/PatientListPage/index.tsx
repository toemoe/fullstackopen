import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import PatientInfo from "../PatientInfo/index";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const openPatientInfo = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const closePatientInfo = (): void => {
    setSelectedPatient(null);
  };

  return (

    <div className="App">
      {selectedPatient ? (
        <div style={{paddingTop: "2rem"}}>
          <PatientInfo patient={selectedPatient} />
          <Button onClick={closePatientInfo}>Close</Button>
        </div>
        ) : (
        <div>
        <Box>
          <Typography align="center" variant="h6">
            Patient list
          </Typography>
        </Box>
        <Table style={{ marginBottom: "1em" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Health Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(patients).map((patient: Patient) => (
              <TableRow key={patient.id} onClick={() => openPatientInfo(patient)} >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell>
                  <HealthRatingBar showText={false} rating={1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewPatient}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Patient
        </Button>
        </div>
      )}
    </div>
  );
};

export default PatientListPage;
