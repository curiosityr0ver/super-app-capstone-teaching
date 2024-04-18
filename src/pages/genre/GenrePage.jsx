import React, { useState, useEffect } from "react";
import styles from "./GenrePage.module.css";
import { IoIosWarning } from "react-icons/io";
import { genres } from "../../assets/data/genres";
import { colors } from "../../assets/data/colors";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";

function GenrePage() {
	const [selectedGenres, setSelectedGenres] = useState([]); // set methods are ALWAYS asynchronous
	const [person, setperson] = useState({ name: "John", age: 25 });
	const [lengthWarning, setLengthWarning] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedGenres.length >= 3) {
			setLengthWarning(false);
		}
		localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
		console.log(localStorage.getItem("selectedGenres"));
	}, [selectedGenres]);

	const removeGenre = (index) => {
		console.log(index); // 3
		const newGenres = selectedGenres.filter((item) => item !== index); // 5 !== 3
		setSelectedGenres(newGenres);
	};

	const selectGenre = (index) => {
		if (selectedGenres.includes(index)) {
			setSelectedGenres((prev) => prev.filter((item) => item !== index));
		} else {
			setSelectedGenres((prev) => [...prev, index]);
		}
	};

	const handleNext = () => {
		if (selectedGenres.length < 3) {
			setLengthWarning(true);
		} else {
			setLengthWarning(false);
			navigate("/homepage");
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				<div className={styles.headers}>
					<h1 className={styles.leftHeader}>Super app</h1>
					<h2 className={styles.leftSubHeader}>
						Choose your <br /> entertainment <br /> category
					</h2>
				</div>

				<div className={styles.selected}>
					{selectedGenres.map((item, index) => (
						<div key={item} className={styles.selectedGenre}>
							{genres[item].title}
							<button onClick={() => removeGenre(item)}>x</button>
						</div>
					))}
				</div>
				{lengthWarning && (
					<div className={styles.warning}>
						<IoIosWarning /> <div> &nbsp;Minimum 3 category required</div>
					</div>
				)}
			</div>
			<div className={styles.right}>
				<div className={styles.genreGrid}>
					{genres.map((genre, index) => (
						<div
							key={index}
							className={styles.genreCard}
							onClick={() => selectGenre(index)}
							style={{
								backgroundColor: colors[index],
								outline: selectedGenres.includes(index)
									? "4px solid green"
									: "",
							}}
						>
							<div className={styles.title}> {genre.title}</div>
							<img src={genre.bgImage} alt="background Image" />
						</div>
					))}
				</div>
				<button className={styles.button} onClick={handleNext}>
					Next Page
				</button>
			</div>
		</div>
	);
}

export default GenrePage;
