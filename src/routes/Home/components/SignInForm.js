import React, { Component } from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import {InputField} from '../../../components/InputField'
import { Field } from 'redux-form'
import DateTimeField from '../../../components/DateTimeField'

class SignInForm extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { fields: { firstName, lastName, address, passport, dob, suburb, postcode }, submitting, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <Field name="firstName" placeholder='FirstName' lable="First Name" id="firstName" component={InputField} type="text" { ...firstName } />
          </Col>
        </Row>
        <Row>
        <Col xs={12}>
          <Field name="lastName" placeholder='LastName' lable="Last Name" id="lastName" component={InputField} type="text" { ...lastName } />
         </Col>
        </Row>
        <Row>
        <Col xs={12}>
           <Field name="dob" placeholder='DOB' lable="Date of Birth" id="dob" component={DateTimeField} type="text" { ...dob } />
         </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field name="address" placeholder='Address' lable="Address" id="address" component={InputField} type="text" { ...address } />
         </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field name="suburb" placeholder='Suburb' lable="Suburb" id="suburb" component={InputField} type="text" { ...suburb } />
         </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field name="postcode" placeholder='Postcode' lable="Postcode" id="postcode" component={InputField} type="text" { ...postcode } />
         </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field name="passport" placeholder='Passport' lable="Passport" id="passport" component={InputField} type="text" { ...passport } />
         </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button type="submit" disabled={submitting} bsStyle="primary">
              { submitting ? <i className="fa fa-refresh fa-spin fa-2x "></i> : "Submit" }
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default SignInForm
