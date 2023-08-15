import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';

import connect from './database/conn.js';



const app = express()

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 3456;

app.use('/api', router)

app.get('/', (req, res) => {
  try{
    res.json("Get request")
  } catch(error){
    res.json(error)
  }
})



// 👇️ specify port number
// const port = 3456;

connect().then(() => {
  try{
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      })
  } catch(error){
      console.log(" Cannot connect to the server ")
  }
}).catch(error => {
    console.log("Invalid database connection")
})


