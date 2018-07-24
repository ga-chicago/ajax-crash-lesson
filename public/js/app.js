console.log("js ajax")



const num = 5;

// jquery ajax function -- takes an object of options including 2 methods, 
// one for success and one for fail

$('#poke-go').on('click', () => {
  console.log("click ", $('#poke-chooser').val())
  $.ajax({
    url: "http://localhost:3003/api/" + $('#poke-chooser').val(),
    method: "GET",
    dataType: 'json',
    success: function(response) {
      console.log(response);
      // code to do whatever w/ response
      $('#poke-holder').append($('<h2>').text(response.name));
      $('#poke-holder').append($('<img>').attr('src', response.sprites.front_default));
    },
    fail: function(err) {
      console.error(err)
    } 
  })
})


const auth = '&APPID=f5339018d0a0d431b71e21f2434b5125';
$('#weather-btn').on('click', (e) => {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast?zip=' 
      + $('#zip').val() 
      + ',us&units=imperial' + auth,
    method: "GET",
    dataType: 'json',
    success: function(response) {
      console.log(response)
      $('#poke-holder').empty();
      response.list.forEach((f) => {
        const d = new Date(f.dt*1000);
        $('#poke-holder').append($('<li>').text(d.toLocaleString() + ": "  + f.main.temp))
      }) 
    },  
    fail: function(error) {

    }
  })
  
})








