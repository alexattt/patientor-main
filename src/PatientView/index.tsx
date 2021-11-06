/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Button, Card } from 'semantic-ui-react';
import { Patient, EntryWithoutId, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from "../types";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";
import { EntryFormModal, OccupationalEntryFormModal, HospitalEntryFormModal } from "../AddEntryModal";

const PatientView = () => {
  const [{ diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  const [occModalOpen, setOccModalOpen] = React.useState<boolean>(false);
  const [occError, setOccError] = React.useState<string | undefined>();
  const openOccModal = (): void => setOccModalOpen(true);

  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [hospitalError, setHospitalError] = React.useState<string | undefined>();
  const openHospitalModal = (): void => setHospitalModalOpen(true);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!patient) {
      void axios
      .get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(response => {
          setPatient(response.data);
      });
    }
  });

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const closeOccupationalModal = (): void => {
    setOccModalOpen(false);
    setOccError(undefined);
  };

  const closeHospitallModal = (): void => {
    setHospitalModalOpen(false);
    setHospitalError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newHealthCheckEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_HEALTHCHECK_ENTRY", payload: newHealthCheckEntry });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const submitNewOccupationalEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newOccupationalHealthCheckEntry } = await axios.post<OccupationalHealthCareEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_OCC_HEALTHCHECK_ENTRY", payload: newOccupationalHealthCheckEntry });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const submitNewHospitalEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newHospitalEntry } = await axios.post<HospitalEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_HOSPITAL_ENTRY", payload: newHospitalEntry });
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  if (patient === undefined) {
    return null;
  }

  const style = {
    display: "flex"
  };

  const css = `
  .entry {
    padding-bottom: 15px;
  }`;

  return (
    <div >
      <style>
        {css}
      </style>
      <div style={style}>
        <h3>{patient.name}</h3>
        {patient.gender === "male" ? <Icon name="man" size="large"></Icon> : <Icon name="woman" size="large"></Icon>}
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>entries</h4>
      {patient.entries?.map(entry => {
        switch(entry.type) {
          case "Hospital":
            return (
              <Card key={entry.id}>
                <Card.Content>
                  <Card.Header>{entry.date} <Icon name="user doctor" size="big"></Icon></Card.Header>
                  <Card.Description>
                    {entry.description}
                    {entry.diagnosisCodes?.map(code => 
                      <ul key={code}>
                        <li>{code}</li>
                        {Object.values(diagnosis).map(d => 
                          (d.code === code) 
                          ? <p key={d.name}>{d.name}</p>
                          : null
                        )}
                      </ul>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          case "OccupationalHealthcare":
            return (
              <Card key={entry.id}>
                <Card.Content>
                  <Card.Header>{entry.date} <Icon name="address card" size="big"></Icon></Card.Header>
                  <Card.Description>
                    {entry.description}
                    {entry.diagnosisCodes?.map(code => 
                      <ul key={code}>
                        <li>{code}</li>
                        {Object.values(diagnosis).map(d => 
                          (d.code === code) 
                          ? <p key={d.name}>{d.name}</p>
                          : null
                        )}
                      </ul>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          case "HealthCheck":
            return (
              <Card key={entry.id}>
                <Card.Content>
                  <Card.Header>{entry.date} <Icon name="clipboard check" size="big"></Icon></Card.Header>
                  <Card.Description>
                    {entry.description}
                    {entry.diagnosisCodes?.map(code => 
                      <ul key={code}>
                        <li>{code}</li>
                        {Object.values(diagnosis).map(d => 
                          (d.code === code) 
                          ? <p key={d.name}>{d.name}</p>
                          : null
                        )}
                      </ul>
                    )}
                    <HealthRatingBar showText={false} rating={entry.healthCheckRating}/>
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          default:
            return (
              <div></div>
            );
          }
        }
      )}
      <EntryFormModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <OccupationalEntryFormModal
        modalOpen={occModalOpen}
        onSubmit={submitNewOccupationalEntry}
        error={occError}
        onClose={closeOccupationalModal}
      />
      <HospitalEntryFormModal
        modalOpen={hospitalModalOpen}
        onSubmit={submitNewHospitalEntry}
        error={hospitalError}
        onClose={closeHospitallModal}
      />
      <Button onClick={() => openModal()}>Add New Healthcheck Entry</Button>
      <Button onClick={() => openOccModal()}>Add New Occupational Healthcare Entry</Button>
      <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>
    </div>
  );
};

export default PatientView;

