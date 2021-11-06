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

const AddHealthcheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: "HealthCheck",
      date: "",
      description: "",
      specialist: "",
      diagnosisCodes: [],
      healthCheckRating: ""
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
      if (!values.healthCheckRating) {
        errors.healthCheckRating = requiredError;
      }
      if (!["0", "1", "2", "3"].includes(values.healthCheckRating.toString())) {
        errors.healthCheckRating = "Rating must be between 0 ('Healthy') and 3  ('Critical')";
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
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />
          <Field
            label="Health check rating"
            placeholder="0-'Healthy', 1-'Low Risk', 2-'High Risk', 3-'Critical Risk'"
            name="healthCheckRating"
            component={TextField}
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

export default AddHealthcheckEntryForm;
