// Create global variables
var form   = document.getElementById('weather-search');
var count  = 0;

function getApi(citySearch) {    
    e.preventDefault();
    
    // Create local variables
    var details = $('.city-details');
    var fiveDay = $('.five-day-cards');
    var cardHdr = $('.five-day-wrap');
    var card    = $('<div>').addClass('col-lg-2 col-md-6');
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
          var list   = data.list;
          var myCity = data.city.name;
          var degree = ' &#8457;';
          var sDate; 

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
            fiveDay.html(card);

          cardHdr.prepend('<h4>5-Day Forecast:</h4>');
          details.addClass('city-details-css'); 

        if (details.html('')) {
          outputDetails();
        } else {
          details.html('');
          outputDetails();
          $('.five-day-wrap').html('');
          fiveDay.html('');
        }

      // Add 5 day cards to container
      fiveDay.append(card); 

      details.html(output).addClass('city-details-css'); 
      cardHdr.html('<h4>5-Day Forecast:</h4>' + fiveDay);   

    })
    .catch(function () {
      alert("Please enter a city");
    });

    // Store search in local storage
    if (city.val() !== "") {
      count += 1;
      let search = 'search-' + count;
      localStorage.setItem(search,city.val());    
    }

    // Refresh form
    form.reset();
    city.focus();

    //init();
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