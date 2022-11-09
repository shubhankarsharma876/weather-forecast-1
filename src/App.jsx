import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <h1 className="text-[40px] font-bold mt-6 flex justify-center text-center">
        ⛈️ Weather Forecast ☀️
      </h1>
      <div className="m-8 p-8 flex justify-center gap-3 text-[20px] ">
        <input
          value={location}
          className="rounded-xl w-[500px] border-black border-2 bg-transparent"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top text-xl">
          <div className="location text-xl">
            <p>{data.name}</p>
          </div>
          <div className="temp text-xl">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description text-xl">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom text-xl">
            <div className="feels text-xl">
              {data.main ? (
                <p className="bold text-xl">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity text-xl">
              {data.main ? <p className="bold text-xl">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind text-xl">
              {data.wind ? (
                <p className="bold text-xl">{data.wind.speed.toFixed()} KPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
