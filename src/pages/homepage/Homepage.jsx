import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import userAvatar from "../../assets/image 14.png";
import axios from "axios";
import { genresHomePage } from "../../assets/data/genres";

function Homepage() {
  const NEWS_API = process.env.REACT_APP_NEWS_API_KEY;
  const WEATHER_API = process.env.REACT_APP_WEATHER_API_KEY;
  const [user, setUser] = useState();
  const [selectedGenres, setSelectedGenres] = useState([1, 2, 3, 4, 5, 6, 7]);

  const [weather, setWeather] = useState();
  const [news, setNews] = useState();

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
      setNews(data.articles[0]);
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
          <div className={styles.userWidget}>
            <img src={userAvatar} alt="user avatar" />
            <div>
              <h3> {user.name}</h3>
              <h3>{user.email}</h3>
              <h1>{user.username}</h1>
              {selectedGenres.length > 0 && (
                <div className={styles.genreGrid}>
                  {selectedGenres
                    .filter((genre, index) => index < 4)
                    .map((genre) => (
                      <div className={styles.pill}>
                        {genresHomePage[genre].title}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
        {weather && (
          <div className={styles.weatherWidget}>
            <div className={styles.header}>
              <h3>{formatDate()}</h3>
            </div>
            <div className={styles.body}>
              <p>{weather.condition.text}</p>
              <p>{weather.temp_c}</p>
              <p>{weather.pressure_mb}</p>
              <p>Wind Speed:{weather.wind_kph}</p>
              <p>Humidity:{weather.humidity}%</p>
              <img src={weather.condition.icon} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        {news && (
          <div className={styles.newsWidget}>
            <img src={news.urlToImage} alt="" />
            <h1>{news.title}</h1>
            <h3>{formatDate(news.publishedAt)}</h3>
            <p>{news.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
