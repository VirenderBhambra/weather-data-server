
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();

const port = process.env.PORT ||3000

app.use(cors())
app.get('/aqidata', async function (req, res) {
    try {
      let location = req.query.location;
      console.log(location,process.env.REACT_APP_PUBLIC_API_KEY)
      let key = process.env.REACT_APP_PUBLIC_API_KEY;
      let response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3&aqi=yes&alerts=no`);
      // if(reponse.data)
      // console.log(response.data.data.aqi)
      console.log(response.data)
      res.send(response.data);
    } 
    catch (error) {
      console.error('Error fetching AQI data:', error.message);
      res.status(500).send(error.message);
    }
  });

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
  });