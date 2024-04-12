import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.css";
import UserWidget from "../../components/UserWidget";
import NotesWidget from "../../components/NotesWidget";
import CountDownWidget from "../../components/CountDownWidget";
// import TimerWidget from "../../components/TimerWidget";
function Dashboard() {
	const [user, setUser] = useState();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		// console.log(new Date());
		// setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		// fetchWeatherData();
		// fetchNewsData();
	}, []);

	// const fetchWeatherData = async () => {
	// 	const { data, status } = await axios.get(
	// 		`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=Mumbai`
	// 	);
	// 	if (status == 200) {
	// 		setWeather(data.current);
	// 	}
	// };
	// const fetchNewsData = async () => {
	// 	const { data, status } = await axios.get(
	// 		`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API}`
	// 	);
	// 	if (status == 200) {
	// 		setNews(data.articles[0]);
	// 	}
	// };
	// console.log(user);

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.UserWidget}>
					{/* {user && <UserWidget user={user} />} */}
				</div>
				<div className={styles.WeatherWidget}></div>
				<div className={styles.TimerWidget}>
					<CountDownWidget />
				</div>
				<div className={styles.NotesWidget}>
					<NotesWidget />
				</div>
				<div className={styles.NewsWidget}></div>
			</div>
		</div>
	);
}

export default Dashboard;
