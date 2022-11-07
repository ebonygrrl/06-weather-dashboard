// Create global variables
var form = document.getElementById('weather-search');

function getApi(e) {    
    e.preventDefault();
    
    // Create local variables
    var details = $('.city-details');
    var city = $('#city').val();
    var api = 'a34fcc159752966bf9fcfe3de164b68e';

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
        
        var myCity =  '<h3>' + data.city.name + '</h3>';
        var degree = ' &#8457;';

        for (let i=0; i < data.list.length; i++){
          var date =  moment(data.list[i].dt_txt).format('M/D/YYYY');
          var temp = data.list[i].main.temp + degree;
          var wind = data.list[i].wind.speed + ' MPH';
          var humid = data.list[i].main.humidity + ' %';
         
          //'img src="http://openweathermap.org/img/wn/' + icon + '.png';
          for (let j=0; j < data.list[i].weather.length; j++) {
            
          var icon = data.list[i].weather[j].icon;
          }
          
          console.log(date + ',' + icon + ',' + temp + ',' + wind + ',' + humid);

          if (i === 0) {
            details.append(myCity);
          }
        }
        /* 
        City details:
        Name (date) weather emoji
        => data.city.name (=> data.list[i].dt) 

        Temp: 80 F

        Wind:

        Humidity:
        */

        /*
        var tableBody = document.getElementById('repo-table');
  
        //Loop over the data to generate a table, each table row will have a link to the repo url
        for (var i = 0; i < data.length; i++) {
          // Creating elements, tablerow, tabledata, and anchor
          var createTableRow = document.createElement('tr');
          var tableData = document.createElement('td');
          var link = document.createElement('a');
  
          // Setting the text of link and the href of the link
          link.textContent = data[i].html_url;
          link.href = data[i].html_url;
  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
          tableData.appendChild(link);
          createTableRow.appendChild(tableData);
          tableBody.appendChild(createTableRow);
        }*/
      });

      form.reset();
      $('#city').focus();
      return;
}

form.addEventListener('submit', getApi);