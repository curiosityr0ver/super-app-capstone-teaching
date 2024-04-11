import React from 'react'
import styles from '../pages/homepage/Homepage.module.css'

function NewsWidget({news, formatDate, formatTime}) {
  return (
    <div className={styles.newsWidget}>
        <div className={styles.header}>
            <img src={news.urlToImage} alt="" />
            <div className={styles.headerText}>
            <h1>{news.title.split('-')[0]}</h1>
            <h3>{formatDate(news.publishedAt)} | {formatTime(news.publishedAt)}</h3>
            </div>    
        </div>
        <div className={styles.footer}>
            {news.description}
        </div>     
    </div>
  )
}

export default NewsWidget