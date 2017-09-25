import { connect } from 'react-redux'
import { mandatoryFiles, supportFiles, deleteFile, resetFiles } from '../../../store/files'
import Document from '../components/Document'

const mapDispatchToProps = {
  deleteFile,
  resetFiles
}

const mapStateToProps = (state) => ({
  user : state.user.user,
  file: state.file,
  supportFiles: supportFiles(state),
  mandatoryFiles: mandatoryFiles(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Document)
