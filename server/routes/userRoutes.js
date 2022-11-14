const express = require("express");
const router = express.Router();
const Credentials = require("../models/usermodels");
const CSV = require("../models/csv-model");
const csv = require("csvtojson");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "fdnbgkd656d5g6dfgmnbdfjfg";
const userAuthentication = require("../middlewares/jwt-authentication");
const fileupload = require("express-fileupload");
const path = require("path");
router.use(fileupload());
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const existing = await Credentials.findOne({ email: email });

    if (existing !== null) {
      res.status(200).json({
        status: "failed",
        message: "User already exists with this email, kindly login",
      });
    } else {
      const saveData = await Credentials.create({
        name: name,
        email: email,
        password: hashPassword,
      });
      res.status(201).json({
        status: "success",
        message: "You are registered successfully, please Log IN",
      });
      console.log(saveData)
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: "Looks like some feilds are empty, please recheck",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Credentials.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(200).json({
        status: "failed",
        message: "Email does not exists kindly register first",
      });
    } else {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatching);
      const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
        expiresIn: "5d",
      });
      if (isPasswordMatching) {
        res.status(200).json({
          status: "success",
          message: "Welcome!! authentication successful, you are logged in successfully",
          jwt_token: token,
        });
      } else {
        res.status(200).json({
          status: "failed",
          message: "Oops!! authentication failed, email or password is incorrect",
        });
      }
    }
    
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Kindly fill all the fields",
    });
  }
});

//using middleware for authentication
router.use("/contact", userAuthentication);
router.use("/", userAuthentication);
router.use("/deletecontact",userAuthentication);

router.get("/",async (req,res)=>{
  const data = await Credentials.find({email:req.user.email});
    res.status(200).json({
      status:"Success",
      data:data
    })
  })


router.get("/contact", async (req, res) => {
  try {
    const contacts = await CSV.find({user:req.user.email});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Failed to render Contacts",
    });
  }
});



router.post("/contact", async (req, res) => {
  const myPath = path.join(__dirname,"../")
  // console.log(req.files)
  let file = req.files.csvfile;
   
    file.mv("./uploads/" + file.name, (err) => {
        if (err) {
            res.json(JSON.stringify(err))
        }
    })
  try {
    
    let jsonArray = await csv().fromFile(myPath+ `uploads/${file.name}`)
    
    for(let i of jsonArray){                 //for(let i=0;i<jsonArray.length,i++){jsonArray[i].user==req.user.email}
      i.user = req.user.email;
    }
   
      console.log(jsonArray)
    const csvData = await CSV.create(jsonArray);
    
    res.status(201).json({
      status: "successful",
      csvData: csvData,
    });
  } catch (error) {
    console.log(myPath)
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
});

router.delete("/deletecontact", async (req, res) => {
    const emails = req.body.emails;
    console.log(emails)
  try {
    const deleteContact = await CSV.deleteMany({email:{$in:emails}})
    console.log(deleteContact)
    res.status(200).json({
      status:"Success",
      message:"Contact has been deleted successfully!!"
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Failed to render Contacts",
    });
  }
});



module.exports = router;
