const express = require('express');
const fs = require('fs'); // Filesystem
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.listen(3000, () => {
    console.log('Server körs!');
})

// Router //
app.get('/', (req, res) =>{
    res.send('Test')
})

if (!fs.existsSync('tweets.json')) {
  let tweets = [];
  fs.writeFileSync('tweets.json', JSON.stringify(tweets))
}
// Lista ut alla tweet
app.get('/tweets', (req,res) =>{ // Hämtar tweets från JSOn filen
    const tweets = JSON.parse(fs.readFileSync('tweets.json').toString()) // Läsa JSON filen
    res.json(tweets) // Skicka jsonformaterat data till användaren
})

// För att kunna skapa fler tweets kör vi app POST.
app.post('/tweets', (req,res) =>{
    // Validition för att "name" och "tweet"
    if(!req.body.hasOwnProperty('name') || req.body.name === '' ) return res.status(400).send('Det saknas Name, var snäll och skriv name.!')
    if(!req.body.hasOwnProperty('tweet') || req.body.tweet === '' ) return res.status(400).send('Det saknas tweet, var snäll och skriv tweet.!')
    const tweets = JSON.parse(fs.readFileSync('tweets.json').toString()) //Hämta tweet
    tweets.push (req.body) // Pusha in en till tweet
    fs.writeFileSync('tweets.json', JSON.stringify(tweets)) // Spara i JSONfilen som JSONFORMAT
    res.json({ success:true }) // Om det går bra / Lyckkas
})

// Skcika status kod.
app.get('*', (req, res) =>{
    res.status(404).send('Not found!')
})
