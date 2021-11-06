/* eslint-disable no-extra-boolean-cast */
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form, Field } from "formik";
import { EntryWithoutId } from "../types";
import { TextField, DiagnosisSelection } from "./FormField";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

export const AddOccupationalHCForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: "OccupationalHealthcare",
      date: "",
      description: "",
      specialist: "",
      diagnosisCodes: [],
      employerName: "",
      sickLeave: {
        startDate: "",
        endDate: ""
      }
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      // eslint-disable-next-line no-extra-boolean-cast
      if ((!values.date) || !Boolean(Date.parse(values.date))) {
        errors.date = requiredError;
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
      if (values.sickLeave.startDate !== "") {
        if (!Boolean(Date.parse(values.sickLeave.startDate))) {
          errors.startDate = "Wrong date format! Should be YYYY-MM-DD";
        }
      }
      if (values.sickLeave.endDate !== "") {
        if (!Boolean(Date.parse(values.sickLeave.endDate))) {
          errors.endDate = "Wrong date format! Should be YYYY-MM-DD";
        }
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
      return (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="Date"
            name="date"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick leave start date (optional)"
            placeholder="Start date"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick leave end date (optional)"
            placeholder="End date"
            name="sickLeave.endDate"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};
