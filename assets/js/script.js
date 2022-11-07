// Create global variables
var form = document.getElementById('weather-search');

function getApi(e) {    
    e.preventDefault();
    
    // Create local variables
    var city    = $('#city');
    var details = $('.city-details');
    var fiveDay = $('.five-day-cards');
    var api     = 'a34fcc159752966bf9fcfe3de164b68e';

    // Fetch request URL
    var requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&limit=1&units=imperial&appid=' + api;

   fetch(requestCity)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var list   = data.list;
        var myCity =  data.city.name;
        var degree = ' &#8457;';
        var sDate; 

        for (let i=0; i < list.length; i++) {
          var date  = list[i].dt_txt; 
          var nDate = moment(date).format('M/D/YYYY');
          var temp  = $('<div>').html('Temp: ' + list[i].main.temp + degree);
          var wind  = $('<div>').html('Wind: ' + list[i].wind.speed + ' MPH');
          var humid = $('<div>').html('Humidity: ' + list[i].main.humidity + ' %'); 

          // I just need ONE DATE out of 5 timestamps!!!
          sDate = date.indexOf('12:00:00') > -1;

          for (let j=0; j < list[i].weather.length; j++) {            
            var icon = '<img src="http://openweathermap.org/img/wn/' + list[i].weather[j].icon + '.png">';
          }

          var cityHead = $('<div>').addClass('city-name').html('<h3>' + myCity + ' (' + nDate + ') ' + icon + '</h3>');

          // Output data
          if (i === 0) {
            details.append(cityHead).append(temp).append(wind).append(humid);
          } else if (sDate) {
            var card = $('<div>').addClass('col-lg-2 col-md-6');              
            card.append(nDate).append(icon).append(temp).append(wind).append(humid);
          }
          
          // Add 5 day cards to container
          fiveDay.append(card);
        }
      });

      // Refresh form
      form.reset();
      city.focus();

      return;
}
// Initiate function when search button clicked
form.addEventListener('submit', getApi);