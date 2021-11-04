/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

const PatientView = () => {
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

  return (
    <div >
      <div style={style}>
        <h3>{patient.name}</h3>
        {patient.gender === "male" ? <Icon name="man" size="large"></Icon> : <Icon name="woman" size="large"></Icon>}
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientView;

