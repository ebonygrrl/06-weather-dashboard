function getApi(city, zip) {
    // Create local variables
    var api = 'a34fcc159752966bf9fcfe3de164b68e';
    // fetch request gets a list of all the repos for the node.js organization
    var requestCity     = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + api;

    //var requestCity     = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&zip=' + zip + '&limit=5&appid=' + api;
    var requestWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=' + api;
  
    fetch(requestCity)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.json);
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
  }
  
  getApi();