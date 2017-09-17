import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='header'>
      <h1>Identity Form</h1>
    </div>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
