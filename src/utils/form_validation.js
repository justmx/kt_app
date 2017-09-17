const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]
const isEmpty = value => value === undefined || value === null || value === ''

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key]))
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required'
  }
}

export function postcode(val) {
  if(!val || val.length !== 4 || Number.isInteger(Number(val)) == false) {
    return "Not a valid postcode";
  }
}
