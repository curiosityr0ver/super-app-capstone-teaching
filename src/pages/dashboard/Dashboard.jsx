import React from "react";
import styles from "./DashBoard.module.css";
function Dashboard() {
	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.UserWidget}></div>
				<div className={styles.WeatherWidget}></div>
				<div className={styles.TimerWidget}></div>
				<div className={styles.NotesWidget}></div>
				<div className={styles.NewsWidget}></div>
			</div>
		</div>
	);
}

export default Dashboard;
