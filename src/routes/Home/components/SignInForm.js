import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { InputField } from '../../../components/InputField'
import { Field } from 'redux-form'
import DateTimeField from '../../../components/DateTimeField'
import './SignInForm.scss'

const SignInForm = (props) => {
  const { fields: { firstName, lastName, address, passport, dob, suburb, postcode },
    submitting, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} id='signin'>
      <Row><h2>Please fill in your details</h2></Row>
      <Row>
        <Col xs={12}>
          <Field name='firstName' placeholder='FirstName' lable='First Name'
            id='firstName' component={InputField} type='text' {...firstName} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='lastName' placeholder='LastName' lable='Last Name'
            id='lastName' component={InputField} type='text' {...lastName} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='dob' placeholder='DOB'
            lable='Date of Birth' id='dob' component={DateTimeField} type='text' {...dob} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='address' placeholder='Address' lable='Address' id='address'
            component={InputField} type='text' {...address} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='suburb' placeholder='Suburb' lable='Suburb' id='suburb'
            component={InputField} type='text' {...suburb} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='postcode' placeholder='Postcode' lable='Postcode' id='postcode'
            component={InputField} type='text' {...postcode} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Field name='passport' placeholder='Passport' lable='Passport' id='passport'
            component={InputField} type='text' {...passport} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button type='submit' disabled={submitting} id='submit' bsStyle='primary'>
            { submitting ? <i className='fa fa-refresh fa-spin fa-2x ' /> : 'Submit' }
          </Button>
        </Col>
      </Row>
    </form>
  )
}

SignInForm.propTypes = {
  fields: PropTypes.array,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export default SignInForm
