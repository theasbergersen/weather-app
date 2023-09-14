import React, { Component } from 'react';

class WeatherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      cities: ['Oslo', 'Trondheim', 'Bergen'], // Byer du ønsker å vise været for som standard
      apiKey: 'cf960bedab619ee16605e4d55e032a50', // Bytt ut med din API-nøkkel
      searchCity: '',
    };
  }

  handleCityChange = (event) => {
    this.setState({ searchCity: event.target.value });
  };

  handleSearch = () => {
    const { searchCity } = this.state;
    let filteredCities = [];
  
    if (searchCity.trim() === '') {
      // If the search field is empty, show standard cities
      filteredCities = ['Oslo', 'Trondheim', 'Bergen'];
    } else {
      // If there's a search query, filter cities based on the query
      filteredCities = [searchCity];
    }
  
    this.setState({ cities: filteredCities }, () => {
      this.fetchWeatherData();
    });
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  fetchWeatherData = () => {
    const { cities, apiKey } = this.state;

    const weatherPromises = cities.map((city) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      return fetch(apiUrl)
        .then((response) => response.json())
        .catch((error) => {
          console.error(`Error fetching weather data for ${city}: `, error);
          return null; // Return null for cities with errors
        });
    });

    Promise.all(weatherPromises).then((weatherData) => {
      this.setState({ weatherData });
    });
  };

  render() {
    const { weatherData, searchCity } = this.state;

    return (
      <div>
        <h2>Søk opp en by:</h2>
        <div>
          <input
            type="text"
            placeholder="Skriv inn"
            value={searchCity}
            onChange={this.handleCityChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <h2>Været akkurat nå:</h2>
        <div className="weather-container">
          {weatherData.map((data, index) =>
            data ? (
              <div key={index} className="weather-box">
                <h3>Været i {data.name}, {data.sys.country}</h3>
                <p>Temperatur: {data.main.temp}°C</p>
                <p>Beskrivelse: {data.weather[0].description}</p>
              </div>
            ) : (
              <div key={index} className="weather-box">
                <p>Feil: Værdata for en eller flere byer kunne ikke hentes.</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default WeatherComponent;
