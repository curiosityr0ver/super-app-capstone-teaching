import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import userAvatar from "../../assets/image 14.png";
import axios from "axios";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { RiContrastDrop2Fill } from "react-icons/ri";
import { genres } from "../../assets/data/genres";
import UserWidget from "../../components/UserWidget";
import WeatherWidget from "../../components/WeatherWidget";
import NewsWidget from "../../components/NewsWidget";

function Homepage() {
	const NEWS_API = process.env.REACT_APP_NEWS_API_KEY;
	const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;
	const [user, setUser] = useState();
	const [selectedGenres, setSelectedGenres] = useState([0, 6, 7, 8]);
	const [weather, setWeather] = useState();
	const [news, setNews] = useState();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		// setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		fetchWeatherData();
		fetchNewsData();
	}, []);

	useEffect(() => {}, []);

	const fetchWeatherData = async () => {
		const { data, status } = await axios.get(
			`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=Mumbai`
		);
		if (status == 200) {
			setWeather(data.current);
		}
	};
	const fetchNewsData = async () => {
		let countryCode;
		if (localStorage.getItem("countryCode")) {
			countryCode = localStorage.getItem("countryCode");
			console.log(countryCode, " from localstorage");
		} else {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(({ coords }) => {
					fetchCountryCode(coords.latitude, coords.longitude).then((output) => {
						countryCode = output;
						console.log(countryCode, " from fetchLocation2");
					});
				});
			}
		}

		const { data, status } = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWS_API}`
		);
		if (status == 200) {
			setNews(data.articles[1]);
		}
	};
	const fetchCountryCode = async (latitude, longitude) => {
		try {
			const { data } = await axios.get(
				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
			);
			const { countryCode } = data;
			localStorage.setItem("countryCode", countryCode);
			return countryCode;
		} catch (error) {
			console.error("Error fetching location:", error);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				{user && <UserWidget user={user} selectedGenres={selectedGenres} />}
				{weather && <WeatherWidget weather={weather} />}
			</div>
			<div className={styles.right}>{news && <NewsWidget news={news} />}</div>
		</div>
	);
}

export default Homepage;
