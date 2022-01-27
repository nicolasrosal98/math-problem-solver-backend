import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload = require("express-fileupload")

config(); 

const herokuSSLSetting = { rejectUnauthorized: false };
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

const client = new Client(dbConfig);
client.connect();

app.get("/", async (req, res) => {
  res.send({
    status: true,
    message: 'This works'
  });
});

app.post('/upload-mathproblem', async (req, res) => {
  try {
    if (req.files) {
      let mathUpload = req.files[''] as fileUpload.UploadedFile
      let problemName = mathUpload.name
      const query = await client.query(
        "insert into photo_problem (filename) values ($1) returning *;",
        [problemName]
      );
      res.status(200).json({ status: "success", data: query.rows });
    } else {
      res.status(400).send({
        status: false,
        message: 'No file uploaded'
      })
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

