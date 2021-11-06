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

export const AddHospitalEntry = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: "Hospital",
      date: "",
      description: "",
      specialist: "",
      diagnosisCodes: [],
      discharge: {
        date: "",
        criteria: ""
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
      if (values.discharge.date) {
        if (!Boolean(Date.parse(values.discharge.date))) {
          errors.discharge = "Wrong date format! Should be YYYY-MM-DD";
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
            label="Discharge date"
            placeholder="Discharge date"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
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
