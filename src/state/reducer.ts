import { State } from "./state";
import { 
  Patient, 
  Diagnosis, 
  HealthCheckEntry, 
  OccupationalHealthCareEntry,
  HospitalEntry } 
from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_HEALTHCHECK_ENTRY";
    payload: HealthCheckEntry;
  }
  | {
    type: "ADD_OCC_HEALTHCHECK_ENTRY";
    payload: OccupationalHealthCareEntry;
  }
  | {
    type: "ADD_HOSPITAL_ENTRY";
    payload: HospitalEntry;
  };

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_HEALTHCHECK_ENTRY":
      window.location.reload();
      return {
        ...state
      };
    case "ADD_OCC_HEALTHCHECK_ENTRY":
      window.location.reload();
      return {
        ...state
      };
    case "ADD_HOSPITAL_ENTRY":
      window.location.reload();
      return {
        ...state
      };
    default:
      return state;
  }
};
