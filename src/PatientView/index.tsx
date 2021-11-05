/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Card } from 'semantic-ui-react';
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import HealthRatingBar from "../components/HealthRatingBar";

const PatientView = () => {
  const [{ diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>();
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
    </div>
  );
};

export default PatientView;

