import { connect } from 'react-redux'
import { createUser } from '../modules/user'
import HomewView from '../components/HomeView'

const mapDispatchToProps = {
  createUser
}

const mapStateToProps = (state) => ({
  user : state.user
})
export default connect(mapStateToProps, mapDispatchToProps)(HomewView)
