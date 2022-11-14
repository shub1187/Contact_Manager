const express = require("express");
const Connection = require("../connection/dbconnect")
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const port = process.env.PORT||8080;
const URL = "mongodb+srv://abhi123:abhi123@cluster0.ihdiqnz.mongodb.net/contact-manager?retryWrites=true&w=majority" 
const routes = require("../routes/userRoutes");
app.use(bodyParser.json());


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
app.use(express.static("upload"))
app.use(cors());
app.use(routes);
Connection(URL)
