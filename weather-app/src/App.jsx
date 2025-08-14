import React, { useEffect, useState } from 'react';

const App = () => {
  const [city, setCity] = useState("Noida");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const months = month[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${months} ${day}, ${year}`;

  const API_KEY = "ddab1bc7dbcb7c34be333ec74b0fa709";

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

      if (!response.ok) {
        throw new Error('City not found. Please try another location.');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="container mx-auto max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city name"
                  onChange={handleInputChange}
                  value={city}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        ) : weatherData ? (
          <>
            <div className="bg-blue-500 text-white p-6 text-center">
              <h1 className="text-xl font-semibold">{formattedDate}</h1>
              <h2 className="text-3xl font-bold mt-2">{weatherData.name}, {weatherData.sys.country}</h2>
            </div>

            <div className="p-6 text-center">
              <div className="flex justify-center">
                <img
                  className="w-32 h-32"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                />
              </div>

              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-800">
                  {Math.round(weatherData.main.temp)}°C
                </span>
                <p className="text-gray-600 mt-2 capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Feels Like</p>
                  <p className="font-semibold">{Math.round(weatherData.main.feels_like)}°C</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Humidity</p>
                  <p className="font-semibold">{weatherData.main.humidity}%</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Wind Speed</p>
                  <p className="font-semibold">{weatherData.wind.speed} m/s</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Pressure</p>
                  <p className="font-semibold">{weatherData.main.pressure} hPa</p>
                </div>
              </div>

              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city name"
                    onChange={handleInputChange}
                    value={city}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;