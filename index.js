import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoute from "./route/Users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import Info from "./db/schema.js"
import { ocrData } from "./ocr.js";
import path from 'path';

//Static files
app.use(express.static(path.join(__dirname,"./Frontend/ocr/build")));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"./Frontend/ocr/build/index.html"))
});

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'))

app.use("/api/users", usersRoute);

const connectionParams = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
};

const db = "mongodb+srv://20ucs154:doOln8gzmKtWHnAi@cluster0.dxlhmit.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./public/Images");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage,
});


// const data = await ocrData("./public/Images/1701661823701_try2.jpg")
// console.log(data);
app.post("/upload", upload.single("file"), async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const path = req.file.destination + "/" + req.file.filename;
    console.log(path);
    const data = await ocrData(path);
    // console.log(data);
    Info.create({
      image : req.file.filename ,
      identificationNumber : data.identificationNumber,
      firstName : data.firstName , 
      lastName : data.lastName , 
      dateOfBirth : data.dateOfBirth ,
      dateOfExpiry : data.dateOfExpiry ,
      dateOfIssue : data.dateOfIssue
    })
    .then(result => res.json(result))
    .catch(err => {console.log(err)})
});

app.use("/", (req, res) => {
    return res.send("OCR-App backend");
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
