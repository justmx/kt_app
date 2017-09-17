import React from 'react'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment'
import moment from 'moment'
import 'react-widgets/dist/css/react-widgets.css'
import {
  FormGroup,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap'
moment.locale('en')
momentLocalizer()

const DateTimeField = (props) => {
  const { input, help, lable, id } = props
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{lable}</ControlLabel>
      <DateTimePicker
        defaultCurrentDate={new Date('1984-08-01')}
        time={false}
        placeholder='Select a date'
        onChange={(date) => {
          input.onChange(moment(date).startOf('day'))
        }}
        value={input.value ? moment(input.value).toDate() : undefined}
      />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

DateTimeField.propTypes = {
  input: PropTypes.object,
  help: PropTypes.string,
  lable: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default DateTimeField
