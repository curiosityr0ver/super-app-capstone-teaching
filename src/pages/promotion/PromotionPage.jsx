import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PromotionPage.module.css";
import { genres } from "../../assets/data/genres";
import SuggestMovies from "./SuggestMovie";
import userAvatar from "../../assets/images/userAvatarBG.png";

function PromotionPage() {
	const [results, setResults] = useState(); // contains the list of all shows from the API
	const [selectedGenres, setSelectedGenres] = useState([0, 1, 2, 3, 4, 5]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get("https://api.tvmaze.com/shows");
			setResults(response.data);
		};
		fetchData();
		// setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
		// setSelectedGenres([3, 4, 6]);
	}, []);

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div>
					<h2>Super app</h2>
					<h4>Entertainment According your choice</h4>
				</div>
				<img className={styles.avatar} src={userAvatar} alt="" />
			</div>

			{selectedGenres?.map(
				(
					genre,
					index // [0, 2, 5, 6] storing the index of genres
				) => (
					<SuggestMovies key={index} index={genre} movies={results} /> // I'm giving the index of the selected genre so that we can filter the shows based on the genre
				)
			)}
		</div>
	);
}

export default PromotionPage;
