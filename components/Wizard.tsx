import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  Box,
  Button,
  TextField as MuiTextField,
  Grid,
} from '@mui/material'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const TextFieldBuilder = (props, sizing) =>
  function TextField() {
    const { values, touched, handleChange, errors } = useFormikContext()
    return (
      <Grid {...sizing} item>
        <MuiTextField
          {...props}
          value={values[props.id]}
          onChange={handleChange}
          error={touched[props[id]] && Boolean(errors[props[id]])}
          helperText={touched[props[id]] && errors[props[id]]}
        />
      </Grid>
    )
  }

const DateFieldBuilder = (props, sizing) =>
  function DateField() {
    const { values, touched, handleChange, errors } = useFormikContext()
    return (
      <Grid {...sizing} item>
        <DatePicker
          value={formik.values[i.props.id] || null}
          {...i.props}
          clearable
          mask="__.__.____"
          onChange={(value) => formik.setFieldValue(i.props.id, value, true)}
          renderInput={(props) => (
            <MuiTextField
              {...props}
              {...i.renderProps}
              error={
                formik.touched[i.props.id] && Boolean(formik.errors[i.props.id])
              }
              helperText={
                formik.touched[i.props.id] && formik.errors[i.props.id]
              }
              // required={
              //   validationSchema.fields[i.props.id].spec.presence ===
              //   'required'
              // }
              // onBlur={() =>
              //   formik.setFieldTouched(i.props.id, true, true)
              // }
            />
          )}
        />
      </Grid>
    )
  }

const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children)
  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const next = (values) => {
    setSnapshot(values)
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
  }

  const previous = (values) => {
    setSnapshot(values)
    setStepNumber(Math.max(stepNumber - 1, 0))
  }

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag)
    }
    if (isLastStep) {
      return onSubmit(values, bag)
    } else {
      bag.setTouched({})
      next(values)
    }
  }

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validation}
    >
      {(formik) => (
        <Form>
          <Stepper activeStep={stepNumber} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.props.label}>
                <StepLabel optional={step.props.description}>
                  {step.props.label}
                </StepLabel>
                <StepContent>
                  {step}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Odeslat' : 'Další krok'}
                      </Button>
                      {index !== 0 && (
                        <Button
                          onClick={() => previous(formik.values)}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Zpět
                        </Button>
                      )}
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Form>
      )}
    </Formik>
  )
}

const WizardStep = ({ children }) => children

const App = () => (
  <Wizard
    initialValues={{
      email: '',
      firstName: '',
      lastName: '',
    }}
    onSubmit={async (values) =>
      sleep(300).then(() => console.log('Wizard submit', values))
    }
  >
    <WizardStep
      onSubmit={() => console.log('Step1 onSubmit')}
      validation={Yup.object({
        firstName: Yup.string().required('required'),
        lastName: Yup.string().required('required'),
      })}
    >
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field
          autoComplete="given-name"
          component="input"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          type="text"
        />
        <ErrorMessage className="error" component="div" name="firstName" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field
          autoComplete="family-name"
          component="input"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
        <ErrorMessage className="error" component="div" name="lastName" />
      </div>
    </WizardStep>
    <WizardStep
      onSubmit={() => console.log('Step2 onSubmit')}
      validation={Yup.object({
        email: Yup.string().email('Invalid email address').required('required'),
      })}
    >
      <div>
        <label htmlFor="email">Email</label>
        <Field
          autoComplete="email"
          component="input"
          id="email"
          name="email"
          placeholder="Email"
          type="text"
        />
        <ErrorMessage className="error" component="div" name="email" />
      </div>
    </WizardStep>
  </Wizard>
)

export default App
