import { connect } from 'react-redux'
import { mandatoryFiles, supportFiles } from '../../../store/files'
import Document from '../components/Document'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  user : state.user.user,
  file: state.file,
  supportFiles: supportFiles(state),
  mandatoryFiles: mandatoryFiles(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Document)
