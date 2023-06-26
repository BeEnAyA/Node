const db = require("../Model/index");
const Student = db.student;
const bcrypt = require("bcryptjs");
const sendEmail = require("../Services/sendMail");

exports.index = async (req, res) => {
  res.render("index");
};

exports.renderLogin = async (req, res) => {
  res.render("login");
};

exports.createStudent = async (req, res) => {
  const { name, email, address, password, file } = req.body;

  //create is for inserting into database
  const created = await db.student.create({
    name: name, // <---if column name is same as object, you can simply pass the name or else like this with (databse column name : object name)
    email: email,
    address: address,
    password: bcrypt.hashSync(password, 10), //encrypting password, here 10 stands for salt which is to make decryption harder(hash is  one way, cannot be unhashed)
    file: req.file.filename,
  });
  console.log(created);
  if(created){
    try {
        const message = "You have successfully registered.";
    
        await sendEmail({
          to: req.body.email,
          text: message,
          subject: "Registration Successful",
        });
      } catch(e) {
        console.log("error sending mail");
        res.render("error");
      }
  }
 
  //redirecting to another page
  res.redirect("/login");
};

exports.loginStudent = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);

  const foundStudent = await db.student.findAll({
    where: {
      email: email,
    },
  });

  if (foundStudent.length == 0) {
    //checking if email exists
    return res.redirect("/login");
  }

  console.log(foundStudent[0].password);
  console.log(bcrypt.compareSync(password, foundStudent[0].password));

  if (bcrypt.compareSync(password, foundStudent[0].password)) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
};

exports.renderEmail = async (req, res) => {
  res.render("email");
};

exports.sendEmail = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);

    // finding email from database
    const allUsers = await db.student.findAll({});
    allUsers.forEach(async (user) => {
      await sendEmail({
        to: user.email,
        text: message,
        subject: "Notification",
      });
    });
  } catch {
    console.log("error sending mail");
    res.render("error");
  }
};


exports.forgotPassword=async(req,res)=>{
    res.render('forgotPassword')

};
exports.resetPassword=async(req,res)=>{
    res.render('resetPassword')

};