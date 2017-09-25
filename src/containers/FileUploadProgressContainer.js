import { connect } from 'react-redux'
import { uploadDocumentRequest, resetLoading } from '../store/files'
import FileUploadProgress from '../components/FileUploadProgress'

const mapDispatchToProps = {
  uploadDocumentRequest,
  resetLoading
}

const mapStateToProps = (state) => ({
  file : state.file
})

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadProgress)
