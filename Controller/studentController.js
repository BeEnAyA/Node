const db = require("../Model/index");
const Student = db.student;
const bcrypt = require("bcryptjs");

exports.index = async (req, res) => {

    res.render("index");
};


exports.renderLogin = async(req,res) =>{
    
    res.render("login");
};

exports.createStudent = async (req, res) =>{
    console.log(req.file)
    const {name, email, address,password,image}= req.body
    
    
    
    // const name= req.body.name;
    // const email= req.body.email;
    // const address= req.body.address;
    // const contact= req.body.contact; <---same thing as writing all at once instead of individually---> const {name, email, address,contact}= req.body

 //create is for insreting into database 
    db.student.create({    
        name: name,        // <---if column name is same as object, you can simply pass the name or else like this with (databse column name : object name)
        email: email,
        address: address,
        password: bcrypt.hashSync(password,10),  //encrypting password, here 10 stands for salt which is to make decryption harder(hash is  one way, cannot be unhashed)
        file:req.file.filename,
    });

    //redirecting to another page
    res.redirect("/login")

};



exports.loginStudent= async(req, res) =>{
    console.log(req.body)
    const{email,password} = req.body;
    console.log(email,password);


    const foundStudent = await db.student.findAll({
        where:{
            email: email,
        }
    });

    if(foundStudent.length==0){     //checking if email exists
        return res.redirect("/login");   
    }

    console.log(foundStudent[0].password);
    console.log(bcrypt.compareSync(password,foundStudent[0].password));

    if(bcrypt.compareSync(password,foundStudent[0].password)){ 
        res.redirect("/home");
    } else{
        res.redirect("/login");    
    }

};


