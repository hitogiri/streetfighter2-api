const express = require('express');
const { fighters } = require('./utils/fighters.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// RETRIEVE THE FULL LIST OF FIGHTERS
// OR RETRIEVE FIGHTERS BY COUNTRY WITH QUERY PARAMETERS
app.get('/api/fighters', (req, res) => {

  const from = req.query.from

  if (from) {
    const originArray = Object.entries(fighters).map((fighter) => fighter[1])
    const fightersByOrigin = originArray.filter((fighter) => fighter.country.toLowerCase() === from.toLowerCase())
    return fightersByOrigin.length ? res.send(fightersByOrigin) : res.send(fighters.unknown)
  }

  res.json(fighters)
})


// RETRIEVE AN INDIVIDUAL FIGHTER BY Name
app.get('/api/fighters/:name', (req, res) => {
  fighterName = req.params.name.toLowerCase()
  if (fighters[fighterName]) {
    return res.status(200).send(fighters[fighterName])
  } else return res.send(fighters.unknown)
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })