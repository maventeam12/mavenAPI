const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMulter = multer({ 
  storage: storage ,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf format allowed!'));
    }
    if(!file && req.method == 'POST'){
      return cb(new Error('Please provide a file!'));
    }
  }
});
const uploadSingleLogo = uploadMulter.single('cvFile');
module.exports =  upload = function (req, res , next) {

      uploadSingleLogo(req, res, function (err) {
          if (err) {
              return res.status(200).send({ error: [
                {
                  "value":"image",
                  msg : {
                    message : err.message
                  }
                }
              ] })
          }
          if (!req.file && req.method == 'POST') {
            return res.status(200).send({ error: [
              {
                "value":"image",
                msg : {
                  message : 'Please provide a file!'
                }
              }
            ] })
        }
          next()
        }
      )}