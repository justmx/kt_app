import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../Counter/modules/counter'
import HomewView from '../components/HomeView'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  counter : state.counter
})
export default connect(mapStateToProps, mapDispatchToProps)(HomewView)
