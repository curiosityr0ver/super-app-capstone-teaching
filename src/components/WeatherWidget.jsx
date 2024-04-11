import React from "react";
import styles from "../pages/homepage/Homepage.module.css";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

const WeatherWidget = ({ weather, formatDate }) => {
  return (
    <div className={styles.weatherWidget}>
      {weather && (
        <>
          <div className={styles.header}>
            <h3>
              <span>{formatDate().formattedDate}</span>
              <span>{formatDate().formattedTime}</span>
            </h3>
          </div>
          <div className={styles.body}>
            <div className={styles.groupWeatherFlex}>
              <img
                className={styles.weatherIcon}
                src={weather.condition.icon}
                alt="weather"
              />
              <p>{weather.condition.text}</p>
            </div>
            <div className={styles.groupWeatherFlex}>
              <p className={styles.temp}>{`${weather.temp_c}°C`}</p>
              <p className={styles.pressureFlex}>
                <span>
                  <FaThermometerThreeQuarters className={styles.pressure} />
                </span>
                <div className={styles.pressureSubFlex}>
                  <span>{`${weather.pressure_mb} mba`}</span>
                  <span>Pressure</span>
                </div>
              </p>
            </div>
            <div className={styles.groupWeatherFlex}>
              <p className={styles.pressureFlex}>
                <span>
                  <FaWind className={styles.wind} />
                </span>
                <div>
                  <span className={styles.pressureSubFlex}>
                    {weather.wind_kph}km/hr
                  </span>
                  <span>wind</span>
                </div>
              </p>
              <p className={styles.pressureFlex}>
                <span>
                  <WiHumidity className={styles.humidity} />
                </span>
                <div className={styles.pressureSubFlex}>
                  <span>{weather.humidity}%</span>
                  <span>Humidity</span>
                </div>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
