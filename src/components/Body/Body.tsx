import React from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";

const Body = (props: any) => {
  const { cityName, weather, errorMessage } = props;
  const { onChangeCityName, onGetWeather, onGetWeatherOnEnter } = props;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <TextField
        id="outlined-basic"
        label="Input city"
        variant="outlined"
        onChange={onChangeCityName}
        onKeyDown={onGetWeatherOnEnter}
        value={cityName}
        defaultValue="Moscow"
        style={{ marginTop: 50 }}
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <Button
        variant="contained"
        style={{ marginTop: 20, paddingLeft: 44, paddingRight: 44 }}
        onClick={onGetWeather}
      >
        Get weather
      </Button>
      {weather.name && (
        <Paper style={{ marginTop: 20, padding: 20.5 }}>
          <b>Weather in {weather.name}:</b> <br />
          {weather.main}: {weather.description} <br />
          Temperature: {weather.temperature.toFixed(2)}°С <br />
          Feels Like: {weather.temperatureFeelsLike.toFixed(2)}°С <br />
          Pressure: {weather.pressure}hpa <br />
          Humidity: {weather.humidity}% <br />
          Wind Speed: {weather.windSpeed}m/s <br />
          Clouds: {weather.clouds}%
        </Paper>
      )}
    </Grid>
  );
};

export default Body;
