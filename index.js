const express = require("express");
const path=require("path");
const app = express();
const port = 4000;
const db= require("./Model/index");
const studentController = require ("./Controller/studentController");
const{storage,multer}=require('./Services/multerConfig')
const upload=multer({storage:storage})
app.set("view engine","ejs");

require("./Config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'Uploads')));

//---------------database----------------


db.sequelize.sync({force:false});

app.get("/", studentController.index);

app.post("/register",upload.single('image'), studentController.createStudent);  //

app.get("/login", studentController.renderLogin);

app.post("/login", studentController.loginStudent)


app.get("/createEmail",studentController.renderEmail)

app.post("/sendEmail",studentController.sendEmail)

app.get("/forgotPassword",studentController.forgotPassword)
app.get("/resetPassword",studentController.resetPassword)



//starting the server
app.listen(port, () => {
  console.log("Node server started at port 4000");
});