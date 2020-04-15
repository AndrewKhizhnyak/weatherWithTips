import React from "react";
import "./App.css";
import { TextField, Button, Grid, Paper } from "@material-ui/core";

function App() {
  const APPID = "9679f75a70ea4ef58e414cb55721cfd8";
  const [cityName, setCityName] = React.useState("Moscow");
  const [weather, setWeather] = React.useState({
    name: "",
    main: "",
    description: "",
    temperature: 0,
    temperatureFeelsLike: 0,
    pressure: 0,
    humidity: 0,
    windSpeed: 0,
    clouds: 0,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };

  const getWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APPID}`
    );
    const result = await response.json();
    if (result.weather) {
      const { name } = result;
      const { main, description } = result.weather[0];
      const { temp, feels_like, pressure, humidity } = result.main;
      const { speed } = result.wind;
      const { all } = result.clouds;

      setWeather({
        name: name,
        main: main,
        description: description,
        temperature: temp,
        temperatureFeelsLike: feels_like,
        pressure: pressure,
        humidity: humidity,
        windSpeed: speed,
        clouds: all,
      });
      setErrorMessage("");
    } else {
      setErrorMessage(result.message);
    }
  };

  const getWeatherIfKeyEnter = (e: any) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/umbrella-with-rain-drops_2614.png"
          alt="logo"
        />
        <a
          className="App-link"
          href="https://www.notion.so/03f6716315e04acea3023766e5f2cc0e"
          target="_blank"
          rel="noopener noreferrer"
        >
          Smart weather forecast service
        </a>
      </header>
      <Grid container direction="column" justify="center" alignItems="center">
        <TextField
          id="outlined-basic"
          label="Input city"
          variant="outlined"
          onChange={handleSetCityName}
          onKeyDown={getWeatherIfKeyEnter}
          value={cityName}
          defaultValue="Moscow"
          style={{ marginTop: 200 }}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button
          variant="contained"
          style={{ marginTop: 20 }}
          onClick={getWeather}
        >
          Get Weather
        </Button>
        {weather.name && (
          <Paper style={{ marginTop: 20, padding: 10 }}>
            <b>Weather in {weather.name}:</b> <br />
            {weather.main} - {weather.description} <br />
            Temperature - {weather.temperature}K <br />
            Feels Like - {weather.temperatureFeelsLike}K <br />
            Pressure - {weather.pressure}hpa <br />
            Humidity - {weather.humidity}% <br />
            Wind Speed: {weather.windSpeed}m/s <br />
            Clouds: {weather.clouds}%
          </Paper>
        )}
      </Grid>
    </div>
  );
}

export default App;
