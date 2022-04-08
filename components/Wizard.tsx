import React, { useState } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Box,
  Button,
} from '@mui/material'

type WizardProps = {
  children: React.ReactElement[] | React.ReactElement
  initialValues: object
  onSubmit: Function
}

export const Wizard = ({ children, initialValues, onSubmit }: WizardProps) => {
  const [stepNumber, setStepNumber] = useState(0)
  const steps = React.Children.toArray(children) as React.ReactElement[]
  const [snapshot, setSnapshot] = useState(initialValues)

  const step = steps[stepNumber]
  const totalSteps = steps.length
  const isLastStep = stepNumber === totalSteps - 1

  const next = (values: object) => {
    setSnapshot(values)
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
  }

  const previous = (values: object) => {
    setSnapshot(values)
    setStepNumber(Math.max(stepNumber - 1, 0))
  }

  const handleSubmit = async (values: object, bag: FormikHelpers<object>) => {
    if (isLastStep) {
      console.log('here')
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
      validationSchema={step.props.validationSchema}
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

type WizardStepProps = {
  children: React.ReactElement[] | React.ReactElement | null
  validationSchema: any
  description: string
  label: string
}

export const WizardStep = ({ children }: WizardStepProps) => <>{children}</>
