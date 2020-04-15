import React from "react";
import "./App.css";
import { TextField, Button, Grid, Paper } from "@material-ui/core";

function App() {
  const APPID = "9679f75a70ea4ef58e414cb55721cfd8";
  const [cityName, setCityName] = React.useState("Moscow");
  const [weather, setWeather] = React.useState("");

  const handleSetCityName = (e: any) => {
    setCityName(e.target.value);
  };

  const getWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APPID}`
    );
    const result = await response.json();
    setWeather(result.weather[0].main);
    console.log(result);
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
          value={cityName}
          defaultValue="Moscow"
          style={{ marginTop: 200 }}
        />
        <Button
          variant="contained"
          style={{ marginTop: 20 }}
          onClick={getWeather}
        >
          Get Weather
        </Button>
        {weather && (
          <Paper style={{ marginTop: 20, padding: 10 }}>
            Weather: {weather}
          </Paper>
        )}
      </Grid>
    </div>
  );
}

export default App;
