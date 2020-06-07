const express = require('express');
const fetch = require('node-fetch');

const app = express();
port = process.env.PORT || 3000;
app.use(express.static('public'));
app.listen(port, ()=>{
    console.log(`Starting server at ${port}`);
});

app.get('/', function(req, res){
    res.json({
        message: 'Did you get it?'
    });
});

app.get('/geo', async (req, res)=>{
    const geo_url = 'latlon.json';
    const response = await fetch(geo_url);
    const json = await response.json();
    response.json(json);
});