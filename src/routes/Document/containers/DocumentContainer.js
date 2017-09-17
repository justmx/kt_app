import { connect } from 'react-redux'

import Document from '../components/Document'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  user : state.user.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Document)
