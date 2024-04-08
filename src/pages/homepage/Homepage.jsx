import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import userAvatar from "../../assets/image 14.png";
import axios from "axios";

function Homepage() {
	const [user, setUser] = useState();
	const [selectedGenres, setSelectedGenres] = useState([]);
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

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("currentUser")));
		setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		fetchWeatherData();
	}, []);

	const fetchWeatherData = async () => {
		const { data, status } = await axios.get(
			"https://api.weatherapi.com/v1/current.json?key=f9f0629e451c480aa08144000240804&q=Mumbai"
		);
		if (status == 200) {
			setWeather(data.current);
		}
	};

	useEffect(() => {
		console.log(weather);
		if (weather) {
			const { condition, pressure_mb, temp_c, wind_kph } = weather;
			console.log(condition, pressure_mb, temp_c, wind_kph);
		}
	}, [weather]);

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
						<h1> {user.name}</h1>
						<h1>{user.email}</h1>
						<h1>{user.username}</h1>
						{selectedGenres.length > 0 && (
							<div className={styles.genreGrid}>
								{selectedGenres.map((genre) => (
									<div className={styles.pill}>{genres[genre].title}</div>
								))}
							</div>
						)}
					</div>
				)}
				<div className={styles.weatherWidget}></div>
			</div>
			<div className={styles.right}></div>
		</div>
	);
}

export default Homepage;
