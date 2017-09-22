var express = require('express')
var multer = require('multer')
var app = express()

// var upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: './uploads',
  filename (req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

app.get('/', function (req, res) {
  res.sendfile('./dist/index.html')
})
app.get('/main.js', function (req, res) {
  res.sendfile('./dist/main.js')
})

app.get('/vendor.js', function (req, res) {
  res.sendfile('./dist/vendor.js')
})

app.get('/normalize.js', function (req, res) {
  res.sendfile('./dist/normalize.js')
})

app.get('/manifest.js', function (req, res) {
  res.sendfile('./dist/manifest.js')
})

app.get('/styles/main.css', function (req, res) {
  res.sendfile('./dist/styles/main.css')
})

app.get('/0.js', function (req, res) {
  res.sendfile('./dist/0.js')
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(upload)
  res.end('File uploaded.')
})

app.listen(3000, function () {
  console.log('Working on port 3000')
})
