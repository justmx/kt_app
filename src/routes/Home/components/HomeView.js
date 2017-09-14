import React from 'react'
import PropTypes from 'prop-types'
// import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = ({ counter, increment, doubleAsync }) => (
  <div>
    <h4>Welcome!</h4>
    <p>Counter: {counter}</p>
  </div>
)

HomeView.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}
export default HomeView
