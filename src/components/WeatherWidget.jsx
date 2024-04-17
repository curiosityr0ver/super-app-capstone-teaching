import React, { useState, useEffect } from "react";
import styles from "./WeatherWidget.module.css";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { RiContrastDrop2Fill } from "react-icons/ri";
import axios from "axios";

function WeatherWidget() {
	const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;
	const [weather, setWeather] = useState();

	useEffect(() => {
		// console.log(new Date());
		// setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		fetchWeatherData();
	}, []);
	const fetchWeatherData = async () => {
		const { data, status } = await axios.get(
			`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=Mumbai`
		);
		if (status == 200) {
			setWeather(data.current);
		}
	};

	const formatDate = () => {
		const formattedDate = new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const formattedTime = new Date().toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});

		return [formattedDate, formattedTime];
	};

	if (weather)
		return (
			<div className={styles.widget}>
				<div className={styles.header}>
					<h1>{formatDate()[0]}</h1>
					<h1>{formatDate()[1]}</h1>
				</div>
				<div className={styles.footer}>
					<div className={styles.column}>
						<img src={weather.condition.icon} alt="" />
						<div>{weather.condition.text}</div>
					</div>
					<div className={styles.column}>
						<div style={{ fontSize: "3rem" }}>{weather.temp_c} °C </div>
						<div>
							<FaThermometerThreeQuarters className={styles.icon} />
							<div>{weather.pressure_mb} mbar</div>
						</div>
						<div>Pressure</div>
					</div>
					<div className={styles.column}>
						<div>
							<FiWind className={styles.icon} />
							{weather.wind_kph} km/h
						</div>
						<div>Wind</div>
						<div>
							<RiContrastDrop2Fill className={styles.icon} />
							<div>{weather.humidity}% </div>
						</div>
						<div>Humidity</div>
					</div>
				</div>
			</div>
		);
}

export default WeatherWidget;
