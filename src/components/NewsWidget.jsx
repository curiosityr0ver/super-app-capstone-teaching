import React from "react";
import styles from "../pages/homepage/Homepage.module.css";

const NewsWidget = ({ news, formatDate }) => {
  return (
    <div className={styles.newsWidget}>
      {news && (
        <>
          <img src={news.urlToImage} alt="" />
          <div className={styles.titleDate}>
            <h3>{news.title}</h3>
            <p>{formatDate(news.publishedAt)}</p>
          </div>
          <p>{news.description}</p>
        </>
      )}
    </div>
  );
};

export default NewsWidget;
