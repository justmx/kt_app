import { connect } from 'react-redux'
import { uploadDocumentRequest } from '../store/files'
import FileUploadProgress from '../components/FileUploadProgress2'

const mapDispatchToProps = {
  uploadDocumentRequest
}

const mapStateToProps = (state) => ({
  file : state.file
})

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadProgress)
