// Create global letiables
let form       = document.getElementById('weather-search');
let searchList = $('#saved-cities');
let count      = 0;

function getApi(e) {    
  e.preventDefault();
  
  // Create local letiables
  let city    = $('#city');
  let details = $('.city-details');
  let fiveDay = $('.five-day-cards');
  let cardHdr = $('.five-day-wrap');
  let api     = 'a34fcc159752966bf9fcfe3de164b68e';  

  // Fetch request URL 
  let requestCity = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city.val() + '&limit=1&units=imperial&appid=' + api;
  
  fetch(requestCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let list   = data.list;
      let myCity = data.city.name;
      let degree = ' &#8457;';
      let card   = '';
      let outputTop = '';
      let sDate; 
      
      for (let i=0; i < list.length; i++) {
        let date  = list[i].dt_txt; 
        let nDate = moment(date).format('M/D/YYYY');
        let temp  = $('<div>').html('Temp: ' + list[i].main.temp + degree);
        let wind  = $('<div>').html('Wind: ' + list[i].wind.speed + ' MPH');
        let humid = $('<div>').html('Humidity: ' + list[i].main.humidity + ' %'); 
        let icon  = '';

        // I just need ONE DATE out of 5 timestamps!!!
        sDate = date.indexOf('12:00:00') > -1;

        for (let j=0; j < list[i].weather.length; j++) {            
          icon = '<img src="http://openweathermap.org/img/wn/' + list[i].weather[j].icon + '.png">';
        }

        let cityHead = $('<div>').addClass('city-name').html('<h2>' + myCity + ' (' + nDate + ') ' + icon + '</h2>');
        console.log(cityHead);
        // Output data
        if (i === 0) {
          outputTop = `${cityHead} ${temp} ${wind} ${humid}`;
          console.log(outputTop);
          //details.html(cityHead).append(temp).append(wind).append(humid);
        } else if (sDate) {      
          card = `<div class="col-lg-2 col-md-6"> ${nDate} ${icon} ${temp} ${wind} ${humid} </div>`; 
        }
      } // End first for-loop

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
  let storage  = window.localStorage;
  let listCity = '';
  let recall   = '';
  let getVal;   

  // Retrieve saved data
  if (storage.length > 0) {
    for (let i=1; i <= storage.length; i++) {
      recall = 'search-' + i;
      getVal = localStorage.getItem(recall);
      listCity += '<button class="search-' + i + ' recent-search">' + getVal + '</button>';
    }
    searchList.html(listCity);
  } 

  // Get search names
  $('.recent-search').on('click', function (e) {
    let btnsearch = $(this).html();
    //getApi(btnsearch);
  });
}

// Initiate function when search button clicked
form.addEventListener('submit', getApi);

init();