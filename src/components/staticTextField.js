import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import Col from 'react-bootstrap/lib/Col'

const StaticTextField = (props) => {
  const { label, value, horizontal } = props
  if (horizontal) {
    return (
      <div className='form-horizontal'>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            {label}
          </Col>
          <Col sm={8}>
            <FormControl.Static componentClass='div'>
              {value}
            </FormControl.Static>
          </Col>
        </FormGroup>
      </div>
    )
  }
  return (
    <FormGroup>
      {label && <ControlLabel>{label}</ControlLabel>}
      <FormControl.Static>
        {value}
      </FormControl.Static>
    </FormGroup>
  )
}

StaticTextField.propTypes = {
  horizontal: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string
}

export default StaticTextField
