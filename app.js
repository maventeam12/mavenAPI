/*
Maven Events web application
version : 1.0.0

set in console 
export NODE_ENV=development
*/

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 4001;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const {rateLimit} = require( 'express-rate-limit');
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 10 minutes
	limit: 300, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});


// middlewares 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(limiter)
app.disable('x-powered-by')
app.use(cookieSession({
  name: 'MavenSession',
  keys: [process.env.MavenCookie],

  maxAge: 15 * 60 * 60 * 1000 // 15 hours
}));
app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//static files
app.use('/userCareer/uploads', express.static('uploads'));
app.use('/event/uploadsEvents', express.static('uploadsEvents'));
app.use('/eventPhotography/uploadsEventPhotographies', express.static('uploadsEventPhotographies'));
app.use('/client/uploadsClientLogo', express.static('uploadsClientLogo'));
app.use('/blog/uploadBlogImage', express.static('uploadBlogImage'));


//routes

// db models invocation
const db = require("./models");
//db.sequelize.sync({ force: true });
db.sequelize.sync();

//routes invvocation
require("./routers/tutorial.routes")(app);
require("./routers/service.routes")(app);
require("./routers/appointment.routes")(app);
require("./routers/career.routes")(app);
require("./routers/responsabilities.routes")(app);
require("./routers/skills.routes")(app);
require("./routers/userCareers.routes")(app);
require("./routers/events.routes")(app)
require("./routers/eventPhotography.routes")(app)
require("./routers/client.routes")(app)
require("./routers/contract.routes")(app)
require("./routers/contractDetails.routes")(app)
require("./routers/contractServices.routes")(app)
require("./routers/contractExtraService.routes")(app)
require("./routers/clientMessage.routes")(app)
require("./routers/companyUser.routes")(app)
require("./routers/blogs.routes")(app)
require("./routers/auth.routes")(app)
require("./routers/loginRegister.routes")(app)




// app.use(express.static(path.join(__dirname, 'website')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.use(express.static(path.join(__dirname, 'Dashboard')));

// app.get('/dashboard/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'Dashboard', 'index.html'));
// });


//In development, you may need to drop existing tables and re-sync database. Just use true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });

app.listen(port, () => {
    });