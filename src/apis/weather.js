import axios from "axios";

const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = async () => {
    const { data, status } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=Mumbai`
    );
    if (status == 200) {
        return data.current;
    }
};