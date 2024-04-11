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
}

export default HomePage;
