const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

app.use(express.json());

app.get('/api', (req, res) => {})

app.post('/api/:id', (req, res) => {
    axios.get('http://alpha-meme-maker.herokuapp.com/memes/'+req.params.id)
  .then(response => {
    res.status(200).json(response.data.data)
  })
  .catch(error => {
    console.log(error);
  });
})

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(8000, () => console.log('Server running'))