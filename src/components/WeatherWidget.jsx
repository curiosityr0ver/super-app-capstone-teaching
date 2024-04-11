import React from 'react'
import styles from '../pages/homepage/Homepage.module.css'
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { RiContrastDrop2Line } from "react-icons/ri";

function WeatherWidget({weather,formatDate, formatTime}) {
  return (
    <div className={styles.weatherWidget}>
        <div className={styles.header}>
            <h1>{formatDate(new Date())}</h1>
            <h1>{formatTime(new Date())}</h1>
        </div>
        <div className={styles.body}>
            <div className={styles.condition}>
                <img src={weather.condition.icon} alt="" width={70} height={70}/>
                <div>{weather.condition.text}</div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.pressure}>
                <h1>{weather.temp_c}°C</h1>
                <div className={styles.details}>
                    <FaThermometerThreeQuarters size="30px" />
                    <div>{weather.pressure_mb} mbar <br /> Pressure</div>
                </div>    
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.wind}>
                <div>
                    <FiWind size={30}/>
                    <p>{weather.wind_kph}km/h <br /> Wind</p>
                </div>
                <div>
                    <RiContrastDrop2Line size={30}/>
                    <p>{weather.humidity} % <br /> Humidity</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherWidget