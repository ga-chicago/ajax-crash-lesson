const express = require('express');
const request = require('superagent')
const app = express();

app.use(express.static('public'))


// renders a page that includes client-side JS that makes a request to third party API
app.get('/', (req, res) => {
  res.render('page.ejs')
})



/// this is an example of how you might use AJAX from the back end in the context of a route
// in an express app -- this could be any route
// makes request to third party API and renders and ejs template with the response data included
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


// this just returns JSON
// your client-side code could just hit this route to avoid CORS
// also you could customize the JSON this route returns
// to be more useful for your speicfic task
app.get('/api/:id', (req, res) => {
  console.log("route hit, id=" ,req.params.id )
  request
    .get('http://pokeapi.co/api/v2/pokemon/' + req.params.id)
    .end((err, response) => {
      if(err) {
        console.log(err)
      }
      res.json(JSON.parse(response.text)) // 
    })
})

app.listen(3003, () => {
  console.log('weather app runnning on 3003')
})