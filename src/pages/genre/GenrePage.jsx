import React, { useState } from "react";
import actionBG from "../../assets/actionBG.png";
import styles from "./GenrePage.module.css";
import { set } from "mongoose";

function GenrePage() {
	const [genres, setGenres] = useState([
		{
			title: "Action",
			bgImage: actionBG,
		},
		{
			title: "Drama",
			bgImage: actionBG,
		},
		{
			title: "Romance",
			bgImage: actionBG,
		},
		{
			title: "Thriller",
			bgImage: actionBG,
		},
		{
			title: "Western",
			bgImage: actionBG,
		},
		{
			title: "Horror",
			bgImage: actionBG,
		},
		{
			title: "Fantasy",
			bgImage: actionBG,
		},
		{
			title: "Music",
			bgImage: actionBG,
		},
		{
			title: "Fiction",
			bgImage: actionBG,
		},
	]);
	const [selectedGenres, setSelectedGenres] = useState([]); // set methods are ALWAYS asynchronous
	const [person, setperson] = useState({ name: "John", age: 25 });
	const [lengthWarning, setLengthWarning] = useState(false);

	const bgColors = [
		"#11B800",
		"#D7A4FF",
		"#11B800",
		"#84C2FF",
		"#902500",
		"#7358FF",
		"#FF4ADE",
		"#E61E32",
		"#6CD061",
	];
	const bgColorsCSS = ["color1", "color2"];

	const removeGenre = (index) => {
		console.log(index); // 3
		const newGenres = selectedGenres.filter((item) => item !== index); // 5 !== 3
		setSelectedGenres(newGenres);
	};

	const selectGenre = (index) => {
		//one element will get added after the execution of this function
		if (selectedGenres.length == 2) {
			// in future, the length will become 3
			setLengthWarning(false);
		}
		// index  = 4
		setSelectedGenres([...selectedGenres, index]);
	};

	const handleNext = () => {
		if (selectedGenres.length < 3) {
			setLengthWarning(true);
		} else {
			setLengthWarning(false);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				<h2>Super app</h2>
				<h1>Choose your entertainment category</h1>
				{lengthWarning && <p>Minimum 3 category required</p>}
				<div className={styles.selected}>
					{selectedGenres.map((item, index) => (
						<div key={item} className={styles.selectedGenre}>
							{genres[item].title}
							<img src={genres[item].bgImage} alt="background Image" />
							<button onClick={() => removeGenre(item)}>X</button>
						</div>
					))}
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.genreGrid}>
					{genres.map((genre, index) => (
						<div
							key={index}
							className={styles.genreCard}
							onClick={() => selectGenre(index)}
							// style={{ backgroundColor: bgColors[index] }}
						>
							{genre.title}
							<img src={genre.bgImage} alt="background Image" />
						</div>
					))}
				</div>
				<button onClick={handleNext}>Next Page</button>
			</div>
		</div>
	);
}

export default GenrePage;
