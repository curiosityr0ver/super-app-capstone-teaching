import React from "react";
import styles from "./UserWidget.module.css";
import userAvatar from "../assets/images/image 14.png";
import { genres } from "../assets/data/genres";

function UserWidget({ user, selectedGenres }) {
	const { name, email, username } = user;
	return (
		<div className={styles.userWidget}>
			<img src={userAvatar} alt="user avatar" />
			<div>
				<h3> {name}</h3>
				<h3>{email}</h3>
				<h1>{username}</h1>
				{selectedGenres && (
					<div className={styles.genreGrid}>
						{selectedGenres
							.filter((_genre, index) => index < 4)
							.map((genre) => (
								<div className={styles.pill}>{genres[genre].title}</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
}

export default UserWidget;
