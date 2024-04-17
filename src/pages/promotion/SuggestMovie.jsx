import React, { useEffect, useState } from "react";
import { genres } from "../../assets/data/genres";
import styles from "./SuggestMovie.module.css";

// import "../Styling/SuggestedMovies.css";

function SuggestMovies({ index, movies }) {
	const [genre, setGenre] = useState();
	const [selectedMovies, setSelectedMovies] = useState();
	useEffect(() => {
		if (index) {
			setGenre(genres[index].title);
		}
	}, [index]);

	useEffect(() => {
		const res = movies
			?.filter((movie) => movie.genres.includes(genre)) // we are iterating over the movies array,
			?.slice(0, 6); // only fetching the first 5 movies
		setSelectedMovies(res);
	}, [movies]);

	// useEffect(() => {
	// 	fetch(
	// 		`https://api.themoviedb.org/3/discover/movie?api_key=f505d443f82304654b994832b5b127eb&with_genres=${genre_id}`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			// console.log(data);
	// 			const results = data.results.slice(0, 4);
	// 			setMovieData(results);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);
	return (
		<div className={styles.widget}>
			<h3>{genre}</h3>
			<div className={styles.catalogue}>
				{selectedMovies?.map(
					(movie, index) =>
						movie && (
							<div key={index}>
								<img src={movie.image.medium} alt={movie.name} />
							</div>
						)
				)}
			</div>
		</div>
	);
}

export default SuggestMovies;
