import React, { useState } from "react";
import actionBG from "../../assets/actionBG.png";
import styles from "./GenrePage.module.css";

function GenrePage() {
	const [genres, setGenres] = useState([
		{
			title: "Action",
			bgImage: actionBG,
		},
		{
			title: "Drama",
			bgImage: "",
		},
		{
			title: "Romance",
			bgImage: "",
		},
		{
			title: "Thriller",
			bgImage: "",
		},
		{
			title: "Western",
			bgImage: "",
		},
		{
			title: "Horror",
			bgImage: "",
		},
		{
			title: "Fantasy",
			bgImage: "",
		},
		{
			title: "Music",
			bgImage: "",
		},
		{
			title: "Fiction",
			bgImage: "",
		},
	]);
	const [selectedGenres, setSelectedGenres] = useState([0, 3, 5]);

	const removeGenre = (index) => {
		console.log(index); // 3
		const newGenres = selectedGenres.filter((item) => item !== index); // 5 !== 3
		setSelectedGenres(newGenres);
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				<h2>Super app</h2>
				<h1>Choose your entertainment category</h1>
				<div className={styles.selected}>
					{selectedGenres.map((item) => (
						<div key={item} className={styles.selectedGenre}>
							{genres[item].title}
							<img src={genres[item].bgImage} alt="background Image" />
							<button onClick={() => removeGenre(item)}>X</button>
						</div>
					))}
				</div>
			</div>
			<div className={styles.right}></div>
		</div>
	);
}

export default GenrePage;
