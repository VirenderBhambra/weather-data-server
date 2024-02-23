const http = require('http');
const url = require('url');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*' // Allow requests from all origins
};
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/aqidata' && req.method === 'GET') {
        const location = parsedUrl.query.location;
        const key = process.env.REACT_APP_PUBLIC_API_KEY;

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3&aqi=yes&alerts=no`)
            .then(response => {
                console.log(response.data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error fetching AQI data:', error.message);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.on('request', cors(corsOptions));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
