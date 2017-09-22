// import React from 'react'
import SignInForm from '../components/SignInForm'
import { reduxForm } from 'redux-form'
import { createValidator, required, postcode } from '../../../utils/form_validation'
import memoize from 'lru-memoize'

const formValidation = createValidator({
  firstName: required,
  lastName: required,
  address: required,
  dob: required,
  passport: required,
  suburb: required,
  postcode: [required, postcode],
})
const validation = memoize(10)(formValidation)

const SignInFormContainer = reduxForm({
  form: 'singIn',
  validate: validation,
  fields: ['firstName', 'lastName', 'address', 'dob', 'passport', 'suburb', 'postcode']
})(SignInForm)

export default SignInFormContainer
