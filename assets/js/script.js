// Create global variables
var form       = document.getElementById('weather-search');
var searchList = $('#saved-cities');
var recent     = $('.recent-search');
var count      = 0;

function getApi(btnSearch, e) {    
    e.preventDefault();
    
    // Create local variables
    var city    = $('#city');
    var details = $('.city-details');
    var fiveDay = $('.five-day-cards');
    var cardHdr = $('.five-day-wrap');
    var card    = $('<div>').addClass('col-lg-2 col-md-6');
    var api     = 'a34fcc159752966bf9fcfe3de164b68e';

    // Fetch request URL
    if (city.val()) {
      var requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&limit=1&units=imperial&appid=' + api;
    } else {
      var requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + btnSearch + '&limit=1&units=imperial&appid=' + api;
    }
   fetch(requestCity)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Output data
        var outputDetails = function() {
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
            
            if (i === 0) {
              details.append(cityHead).append(temp).append(wind).append(humid);
            } else if (sDate && i > 0 && i < 6) {                            
              card.append(nDate).append(icon).append(temp).append(wind).append(humid);
            }  

            // Add 5 day cards to container
            fiveDay.append(card);

          } // End first for-loop

          cardHdr.html('<h4>5-Day Forecast:</h4>');
          details.addClass('city-details-css');  
        } // End of outputDetails function

        if (details.is(':empty')) {
          outputDetails();
        } else {
          details.html('');
          outputDetails();
        }
      })
      .catch(function () {
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
  } else {
    recall = 'search-0';
    getVal = localStorage.getItem(recall);
    listCity = '<button class="search-' + i + ' recent-search">' + getVal + '</button>';
    searchList.html(listCity);
  }

  // Get search names
  $('.recent-search').on('click', function () {
    var btnSearch = $(this).html();
    getApi(btnSearch, event);
  });
}

// Initiate function when search button clicked
form.addEventListener('submit', getApi);

init();