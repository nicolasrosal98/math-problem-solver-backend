import { config } from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload = require("express-fileupload")

// ML
import * as tf from '@tensorflow/tfjs';

// async function modelpredict(image: string) {
//     const MODEL_URL = 'https://raw.githubusercontent.com/vipul79321/Handwritten-Equation-Solver/master/model_final.json';
//     const model = await tf.loadGraphModel(MODEL_URL)
//     return model.predict(image)
// }

config(); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", async (req, res) => {
  res.send({
    status: true,
    message: 'This works'
  });
});

app.post('/upload-mathproblem', (req, res) => {
  if (req.files) {
    console.log(req.files)
  }
})

// app.post('/upload-mathproblem', async (req, res) => {
//   try {
//       if(!req.files) {
//           res.send({
//               status: false,
//               message: 'No file uploaded'
//           });
//       } else {
//           let mathproblem = req.files.mathproblem as fileUpload.UploadedFile;
        
//           res.send({
//               status: true,
//               message: 'File is uploaded',
//               data: {
//                   name: mathproblem.name,
//                   mimetype: mathproblem.mimetype,
//                   size: mathproblem.size
//               },
//               // formula: modelpredict(mathproblem)
//           });
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

