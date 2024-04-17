import React from "react";
import styles from "./NewsWidget.module.css";

function NewsWidget({ news }) {
	console.log(news);
	const formatDate = (date) => {
		if (date) {
			const formattedDate = new Date(news.publishedAt).toLocaleDateString(
				"en-US",
				{
					year: "numeric",
					month: "long",
					day: "numeric",
				}
			);
			const formattedTime = new Date(news.publishedAt).toLocaleTimeString(
				"en-US",
				{
					hour: "numeric",
					minute: "numeric",
					hour12: true,
				}
			);

			return `${formattedDate} ${formattedTime}`;
		} else {
			const formattedDate = new Date().toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
			const formattedTime = new Date().toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});

			return `${formattedDate} ${formattedTime}`;
		}
	};

	return (
		<div className={styles.newsWidget}>
			<div className={styles.header}>
				<img src={news.urlToImage} alt="" />
				<div className={styles.headerText}>
					<h3>{news.title.split("-")[0]}</h3>
					<h5>{formatDate(news.publishedAt)}</h5>
				</div>
			</div>
			<div className={styles.footer}>{news.description}</div>
		</div>
	);
}

export default NewsWidget;
