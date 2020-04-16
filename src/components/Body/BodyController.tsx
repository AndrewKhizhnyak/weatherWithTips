import React from "react";
import Body from "./Body";

const BodyController = () => {
  const APP_ID = "9679f75a70ea4ef58e414cb55721cfd8";
  const ABSOLUTE_ZERO = 273.15;
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

  const handleChangeCityName = (e: any) => {
    setCityName(e.target.value);
  };

  const handleGetWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APP_ID}`
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
        temperature: temp - ABSOLUTE_ZERO,
        temperatureFeelsLike: feels_like - ABSOLUTE_ZERO,
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

  const handleGetWeatherOnEnter = (e: any) => {
    if (e.key === "Enter") {
      handleGetWeather();
    }
  };
  return (
    <Body
      cityName={cityName}
      weather={weather}
      errorMessage={errorMessage}
      onChangeCityName={handleChangeCityName}
      onGetWeather={handleGetWeather}
      onGetWeatherOnEnter={handleGetWeatherOnEnter}
    />
  );
};

export default BodyController;
