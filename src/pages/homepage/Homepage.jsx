import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import userAvatar from "../../assets/image 14.png";
import axios from "axios";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { RiContrastDrop2Fill } from "react-icons/ri";
import { genres } from "../../assets/data/genres";
import UserWidget from "../../components/UserWidget";

function Homepage() {
	const NEWS_API = process.env.REACT_APP_NEWS_API_KEY;
	const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;
	const [user, setUser] = useState();
	const [selectedGenres, setSelectedGenres] = useState([0, 1, 6, 7]);
	const [weather, setWeather] = useState();
	const [news, setNews] = useState();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		// console.log(new Date());
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
			setNews(data.articles[0]);
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

	const formatDate = (date) => {
		if (date) {
			const formattedDate = new Date(news.publishedAt).toLocaleDateString(
				"en-US",
				{
					year: "numeric",
					month: "long",
					day: "numeric",
				}
			);
			const formattedTime = new Date(news.publishedAt).toLocaleTimeString(
				"en-US",
				{
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				}
			);

			return `${formattedDate} ${formattedTime}`;
		} else {
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

			return `${formattedDate} ${formattedTime}`;
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				{user && <UserWidget user={user} selectedGenres={selectedGenres} />}
				{weather && (
					<div className={styles.weatherWidget}>
						<div className={styles.header}>
							<h1>{formatDate()}</h1>
						</div>
						<div className={styles.footer}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<img src={weather.condition.icon} alt="" />
								<div>{weather.condition.text}</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div style={{ fontSize: "3rem" }}>{weather.temp_c} °C </div>
								<FaThermometerThreeQuarters />
								<div>{weather.pressure_mb} mbar</div>
								<div>Pressure</div>
							</div>
							<div>
								<div>Wind Speed:{weather.wind_kph}</div>
								<FiWind />

								<div>Humidity:{weather.humidity}%</div>
								<RiContrastDrop2Fill />
							</div>
						</div>
					</div>
				)}
			</div>
			{/* <div className={styles.right}>
				{news && (
					<div className={styles.newsWidget}>
						<div className={styles.header}>
							<img src={news.urlToImage} alt="" />
							<div className={styles.headerText}>
								<h3>{news.title.split("-")[0]}</h3>
								<h5>{formatDate(news.publishedAt)}</h5>
							</div>
						</div>
						<div className={styles.footer}>{news.description}</div>
					</div>
				)}
			</div> */}
		</div>
	);
}

export default Homepage;
