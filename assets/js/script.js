// Create global variables
var form = document.getElementById('weather-search');

function getApi(e) {    
    e.preventDefault();
    
    // Create local variables
    var city    = $('#city').val();
    var details = $('.city-details');
    var fiveDay = $('.five-day-cards');
    var api     = 'a34fcc159752966bf9fcfe3de164b68e';

    // Fetch request
    var requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + api; 

   fetch(requestCity)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log('---------------------------');
        console.log(data.list);
        console.log('---------------------------');
        
        var myCity =  data.city.name;
        var degree = ' &#8457;';

        for (let i=0; i < data.list.length; i++){
          var date =  moment(data.list[i].dt_txt).format('M/D/YYYY');
          var temp = $('<div>').html('Temp: ' + data.list[i].main.temp + degree);
          var wind = $('<div>').html('Wind: ' + data.list[i].wind.speed + ' MPH');
          var humid = $('<div>').html('Humidity: ' + data.list[i].main.humidity + ' %');
          
          for (let j=0; j < data.list[i].weather.length; j++) {            
            var icon = '<img src="http://openweathermap.org/img/wn/' + data.list[i].weather[j].icon + '.png">';
          }

          //console.log(date + ',' + icon + ',' + temp + ',' + wind + ',' + humid);
          var cityHead = $('<div>').addClass('city-name').html('<h3>' + myCity + ' (' + date + ') ' + icon + '</h3>');
          var card     = $('<div>').addClass('col-lg-2 col-md-6');

          if (i === 0) {
            details
              .append(cityHead)
              .append(temp)
              .append(wind)
              .append(humid);
          } else if (i > 0 && i <= 5 ) {
              card
                .append(date)
                .append(icon)
                .append(temp)
                .append(wind)
                .append(humid);

                // Add 5 day cards to container
                fiveDay.append(card);
          }
        }
      });

      // Refresh form
      form.reset();
      $('#city').focus();

      return;
}
// Initiate function when search button clicked
form.addEventListener('submit', getApi);