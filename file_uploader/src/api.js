var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var port = 8000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var allowedOrigins = ['http://localhost:3000',
    'http://yourapp.com'];
// to change directory then change it from DIR.
const DIR = '../public/';
app.use(cors())
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage });
app.listen(port, () => {
    console.log("Server started on port " + port);
})


app.post('/upload', function (req, res, next) {
    upload = multer({ storage: storage }).single('selectedFile')
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
});
app.post('/multiple', function (req, res, next) {
    upload = multer({ storage: storage }).array('selectedFile');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
});
module.exports = app;