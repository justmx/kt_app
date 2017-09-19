import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'

export const InputField = (props) => {
  const { input, meta, lable, id } = props
  return (
    <FormGroup controlId={id}>
      <ControlLabel className='floatLabel'>{lable}</ControlLabel>
      <FormControl value={input.value} onChange={input.onChange} type='text'/>
      { meta.error && meta.touched &&
        <HelpBlock style={{ color: '#e41717', textAlign: 'start' }}>
          {meta.error}
        </HelpBlock> }
    </FormGroup>
  )
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  id: PropTypes.string,
  lable: PropTypes.string
}
