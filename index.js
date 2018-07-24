const express = require('express');
const request = require('superagent')
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('page.ejs')
})

app.get('/p/:id', (req, res) => {
  console.log("route hit, id=" ,req.params.id )
  request
    .get('http://pokeapi.co/api/v2/pokemon/' + req.params.id)
    .end((err, response) => {
      if(err) {
        console.log(err)
      }
      // res.json(JSON.parse(response.text))

      const theData = JSON.parse(response.text)

      res.render('poke.ejs', {
        data: theData
      })
    })
})
app.get('/api/:id', (req, res) => {
  console.log("route hit, id=" ,req.params.id )
  request
    .get('http://pokeapi.co/api/v2/pokemon/' + req.params.id)
    .end((err, response) => {
      if(err) {
        console.log(err)
      }
      res.json(JSON.parse(response.text))
    })

})

app.listen(3003, () => {
  console.log('weather app runnning on 3003')
})