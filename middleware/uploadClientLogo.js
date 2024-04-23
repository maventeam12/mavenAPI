const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsClientLogo/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMulter = multer({ 
  storage: storage ,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"|| file.mimetype == "image/svg"|| file.mimetype == "image/xml"|| file.mimetype == "image/webp"|| file.mimetype == "image/gif"|| file.mimetype == "image/avif"|| file.mimetype == "image/apng") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only image format allowed!'));
    }
  }
});
const uploadSingleLogo = uploadMulter.single('logoFile');
module.exports =  upload = function (req, res , next) {

      uploadSingleLogo(req, res, function (err) {
  
          if (err) {
              return res.status(200).send({ error: [
                {
                  "value":"",
                  msg : {
                    message : err.message
                  }
                }
              ] })
          }
          next()
        }
      )}