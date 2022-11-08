// Create global variables
var form   = document.getElementById('weather-search');
var count  = 0;

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
        var myCity = data.city.name;
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

          var cityHead = $('<div>').addClass('city-name').html('<h2>' + myCity + ' (' + nDate + ') ' + icon + '</h2>');

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

        $('.five-day-wrap').prepend('<h4>5-Day Forecast:</h4>');
        details.addClass('city-details-css');

      })
      .catch(function err () {
        alert("Please enter a city");
      });

      // Store search in local storage
      if (city.val() !== "") {
        count += 1;
        var search = 'search-' + count;
        localStorage.setItem(search,city.val());    
      }

      // Refresh form
      form.reset();
      city.focus();

      init();
}

function init() {
  var storage = window.localStorage;

  // Retrieve saved data
  if (storage.length > 0) {
    for (var i=1; i <= storage.length; i++) {
      var recall = 'search-' + i;
      var getVal = localStorage.getItem(recall);
      var listCity = $('<button>').addClass(recall).html(getVal);
      if (listCity.html('')) {
        $('.saved-cities').append(listCity);
        console.log('no text');
      } else {
        listCity.replaceWith(listCity);
        console.log('text');
      }
    }
  }
}

// Initiate function when search button clicked
form.addEventListener('submit', getApi);

init();