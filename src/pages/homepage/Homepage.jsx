import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";

import axios from "axios";
import UserWidget from "../../components/UserWidget";
import WeatherWidget from "../../components/WeatherWidget";
import NewsWidget from "../../components/NewsWidget";

function HomePage() {
  const [user, setUser] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [news, setNews] = useState();
  const [weather, setWeather] = useState();
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { RiContrastDrop2Fill } from "react-icons/ri";

function Homepage() {
	const NEWS_API = process.env.REACT_APP_NEWS_API_KEY;
	const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;
	const [user, setUser] = useState();
	const [selectedGenres, setSelectedGenres] = useState([1, 2, 3]);
	const genres = [
		{
			title: "Action",
		},
		{
			title: "Drama",
		},
		{
			title: "Romance",
		},
		{
			title: "Thriller",
		},
		{
			title: "Western",
		},
		{
			title: "Horror",
		},
		{
			title: "Fantasy",
		},
		{
			title: "Music",
		},
		{
			title: "Fiction",
		},
	];
	const [weather, setWeather] = useState();
	const [news, setNews] = useState();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		// console.log(new Date());
		// setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		fetchWeatherData();
		fetchNewsData();
	}, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
    // console.log(JSON.parse(localStorage.getItem("currentUser")));
    setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
    // console.log(JSON.parse(localStorage.getItem("selectedGenres")));
    fetchWeatherData();
    fetchNewsData();
  }, []);

  async function fetchNewsData() {
    const { data, status } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${newsApiKey}`
    );
    if (status === 200) {
      setNews(data.articles[0]);
    }
  }

  async function fetchWeatherData() {
    const { data, status } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=kochi`
    );
    if (status === 200) setWeather(data.current);
  }

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

      return `${formattedDate}  ${formattedTime}`;
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

      return { formattedDate, formattedTime };
    }
  };

  useEffect(() => {
    console.log(weather);
    console.log(news);

    // if (weather) {
    //   const { condition, pressure_mb, temp_c, wind_kph } = weather;
    //   console.log(condition, pressure_mb, temp_c, wind_kph);
    // }
  }, [weather, news]);

  // useEffect(() => {
  //   genres.map((genre, index) => {
  //     if (selectedGenres.includes(index)) {
  //       // console.log(genre);
  //     }
  //   });
  // }, [selectedGenres]);
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <UserWidget user={user} selectedGenres={selectedGenres} />
        <WeatherWidget weather={weather} formatDate={formatDate} />
      </div>
      <div className={styles.right}>
        <NewsWidget news={news} formatDate={formatDate} />
      </div>
    </div>
  );

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				{user && (
					<div className={styles.userWidget}>
						<img src={userAvatar} alt="user avatar" />
						<div>
							<h3> {user.name}</h3>
							<h3>{user.email}</h3>
							<h1>{user.username}</h1>
							{selectedGenres && (
								<div className={styles.genreGrid}>
									{selectedGenres
										.filter((genre, index) => index < 4)
										.map((genre) => (
											<div className={styles.pill}>{genres[genre].title}</div>
										))}
								</div>
							)}
						</div>
					</div>
				)}
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
			<div className={styles.right}>
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
			</div>
		</div>
	);

}

export default HomePage;
