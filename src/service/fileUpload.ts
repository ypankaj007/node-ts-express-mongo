
export let UPLOAD_PATH = 'uploads';
import * as multer from 'multer';
import * as path from 'path';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, req.loggedInUser._id + path.extname(file.originalname))
    }
})

export let upload = multer({ storage: storage })
export let profileUpload = multer({ storage: profileStorage })