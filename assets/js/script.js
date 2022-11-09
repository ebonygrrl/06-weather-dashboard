// Create global variables
var form       = document.getElementById('weather-search');
var searchList = $('#saved-cities');
var recent     = $('.recent-search');
var count      = 0;

function getApi(citySearch) {

  // Create local variables
  var details = $('.city-details');
  var cardHdr = document.getElementById('five-day-txt');
  var cards   = $('#five-day-cards').html('');
  var api     = 'a34fcc159752966bf9fcfe3de164b68e';

  if (!citySearch) {
    citySearch = $('#city').val();
  } else {
    citySearch
  }

  // Fetch request URL
  var requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&limit=1&units=imperial&appid=' + api;

  fetch(requestCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var list = data.list;
      var myCity = data.city.name;
      var degree = ' &#8457;';
      var sDate;
      
      for (let i = 0; i < list.length; i++) {
        var date = list[i].dt_txt;
        var nDate = moment(date).format('M/D/YYYY');
        var temp = '<div>Temp: ' + list[i].main.temp + degree + '</div>';
        var wind = '<div>Wind: ' + list[i].wind.speed + ' MPH</div>';
        var humid = '<div>Humidity: ' + list[i].main.humidity + ' %</div>';

        // I just need ONE DATE out of 5 timestamps!!!
        sDate = date.indexOf('12:00:00') > -1;

        for (let j = 0; j < list[i].weather.length; j++) {
          var icon = '<img src="http://openweathermap.org/img/wn/' + list[i].weather[j].icon + '.png">';
        }

        var cityHead = '<div class="city-name"><h2>' + myCity + ' (' + nDate + ') ' + icon + '</h2>';

        if (i === 0) {
          var output = `${cityHead} ${temp} ${wind} ${humid}`;
          details.html(output).addClass('city-details-css');
        } else if (sDate) {
          var card = `<div class="col-lg-2 col-md-6"> ${nDate} ${icon} ${temp} ${wind} ${humid} </div>`;
        }        
      }

      let counter = 4
      while (counter >= 0) {
        cards.append(card);
        counter--;
      }

      cardHdr.innerHTML = `<h4>5-Day Forecast:</h4>`;

    });

  // Store search in local storage
  if (citySearch !== "") {
    count += 1;
    let search = 'search-' + count;
    localStorage.setItem(search, citySearch);
  }

  // Refresh form
  form.reset();
  city.focus();

  init();
}

function init() {
  var storage  = window.localStorage;
  var listCity = '';
  var recall   = '';
  var getVal;   

  // Retrieve saved data
  if (storage.length > 0) {
    for (var i=1; i <= storage.length; i++) {
      recall = 'search-' + i;
      getVal = localStorage.getItem(recall);
      listCity += '<button class="search-' + i + ' recent-search">' + getVal + '</button>';
    }
    searchList.html(listCity);
  } 

  // Get search names
  $('.recent-search').on('click', function () {
    var citySearch = $(this).html();
    getApi(citySearch);
  });
}

// Initiate function when search button clicked
form.addEventListener('submit', function (e) {
  e.preventDefault();
  getApi()
});

init();