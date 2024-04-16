import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PromotionPage.module.css";
import { genres } from "../../assets/data/genres";

function PromotionPage() {
	const [results, setResults] = useState();
	const [selectedGenres, setSelectedGenres] = useState();
	const [selectedQueries, setSelectedQueries] = useState();
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get("https://api.tvmaze.com/shows");
			setResults(response.data);
		};
		// fetchData();
		setSelectedGenres(JSON.parse(localStorage.getItem("selectedGenres")));
	}, []);

	useEffect(() => {
		if (selectedGenres) {
			setSelectedQueries(
				selectedGenres.map((index) => {
					console.log(genres[index].title);
				})
			);
		}

		if (results) {
			results.map((result) => {
				console.log(result.genres);
			});
		}
	}, [results, genres]);

	useEffect(() => {
		console.log(selectedQueries);
	}, [selectedQueries]);

	return <div>PromotionPage</div>;
}

export default PromotionPage;
