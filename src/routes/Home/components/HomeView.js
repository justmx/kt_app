import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import './HomeView.scss'
import Helmet from 'react-helmet'
import SignInFormContainer from '../containers/SignInFormContainer'

export const HomeView = ({ createUser, router }) => {
  const title = 'Identy Form'
  const cleanData = (data) => {
    if (data.dob) {
      const date = data.dob.format('YYYY-M-D')
      data['dob'] = date
    }
    return data
  }

  const handleSubmit = (data) => {
    data = cleanData(data)
    createUser(data)
      .then((res) => {
        router.push('/document')
      })
  }

  return (
    <div className='' id=''>
      <Helmet
        title={title}
      />
      <header>
        <Grid fluid className=''>
          <div className=''>
            <h3>Please fill in your details</h3>
          </div>
        </Grid>
      </header>
      <section>
        <Grid>
          <Col xs={12} sm={8} smPush={2} md={8} mdPush={3} lg={6} lgPush={3} className='siginInForm'>
            <SignInFormContainer onSubmit={handleSubmit} />
          </Col>
        </Grid>
      </section>
    </div>
  )
}

HomeView.propTypes = {
  createUser: PropTypes.func.isRequired,
  router: PropTypes.object
}
export default HomeView
