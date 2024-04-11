import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import userAvatar from "../../assets/image 14.png";
import axios from "axios";
import { genresHomePage } from "../../assets/data/genres";
import UserWidget from "../../components/UserWidget";
import WeatherWidget from "../../components/WeatherWidget";
import NewsWidget from "../../components/NewsWidget";

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
    // console.log(new Date());
    setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
    fetchWeatherData();
    fetchNewsData();
  }, []);

  const fetchWeatherData = async () => {
    const { data, status } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=Mumbai`
    );
    if (status == 200) {
      setWeather(data.current);
    }
  };
  const fetchNewsData = async () => {
    const { data, status } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API}`
    );
    if (status == 200) {
      setNews(data.articles[1]);
    }
  };

  const formatDate = (date) => {
    if(weather || news){
        const formattedDate =  new Date(date).toLocaleString('en-IN',{
            day:'numeric',
            month: 'long',
            year: 'numeric'
        })
        return formattedDate
    }
}
const formatTime = (date) => {
    if(weather || news){
        const formattedTime = new Date(date).toLocaleString('en-IN',{
            hour:'numeric',
            minute: 'numeric',
            hour12: true
        })
        return formattedTime
    }
}

  useEffect(() => {
    console.log(weather);

    // if (weather) {
    // 	const { condition, pressure_mb, temp_c, wind_kph } = weather;
    // 	console.log(condition, pressure_mb, temp_c, wind_kph);
    // }
  }, [weather, news]);

  useEffect(() => {
    // genres.map((genre, index) => {
    // 	if (selectedGenres.includes(index)) {
    // 		console.log(genre);
    // 	}
    // });
    // selectedGenres.map((genre) => {
    // 	console.log(genres[genre]);
    // });
    // console.log(user);
  }, [selectedGenres, user]);

  return (
    <div className={styles.page}>
      <div className={styles.left}>
            {user && (
                <UserWidget user={user} userAvtar={userAvatar} selectedGenre={selectedGenres} genres={genres} />
            )}
            {weather && (
                <WeatherWidget weather={weather} formatDate={formatDate} formatTime={formatTime}/>
            )}
        </div>
        <div className={styles.right}>
            {news &&(
                <NewsWidget news={news} formatDate={formatDate} formatTime={formatTime}/>
            )}
        </div>
    </div>
  );
}

export default Homepage;
