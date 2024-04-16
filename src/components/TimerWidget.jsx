import React, { useState, useEffect } from "react";
import styles from "./TimerWidget.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CountdownTimer() {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let intervalId;
		if (isActive) {
			intervalId = setInterval(() => {
				if (seconds === 0) {
					if (minutes === 0) {
						if (hours === 0) {
							clearInterval(intervalId);
							setIsActive(false);
							return;
						}
						setHours((prevHours) => prevHours - 1);
						setMinutes(59);
						setSeconds(59);
					} else {
						setMinutes((prevMinutes) => prevMinutes - 1);
						setSeconds(59);
					}
				} else {
					setSeconds((prevSeconds) => prevSeconds - 1);
				}
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isActive, hours, minutes, seconds]);

	const startTimer = () => {
		setIsActive(true);
		setDuration(hours * 3600 + minutes * 60 + seconds);
	};

	const stopTimer = () => {
		setIsActive(false);
	};

	const resetTimer = () => {
		setIsActive(false);
		setHours(0);
		setMinutes(0);
		setSeconds(0);
		setDuration(0);
	};

	const increment = (setter) => {
		setter((prevValue) => prevValue + 1);
	};

	const decrement = (setter) => {
		setter((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
	};
	const percentage = isActive
		? Math.floor(
				((duration - (hours * 3600 + minutes * 60 + seconds)) / duration) * 100
		  )
		: 0;

	return (
		<div className={styles.timerWidget}>
			<div className={styles.circle}>
				<div
					style={{
						height: "200px",
						width: "200px",
					}}
				>
					<CircularProgressbar
						value={isActive ? percentage : 100}
						text={`${hours.toString().padStart(2, "0")}:${minutes
							.toString()
							.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
						strokeWidth={3}
						styles={buildStyles({
							rotation: 0.25,

							// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
							strokeLinecap: "round",

							// Text size
							textSize: "16px",

							// How long animation takes to go from one percentage to another, in seconds
							pathTransitionDuration: 0.5,

							// Can specify path transition in more detail, or remove it entirely
							// pathTransition: 'none',

							// Colors
							pathColor: "#FF6A6A",
							textColor: "#FFFFFF",
							trailColor: "#191E39",
						})}
						hey
					></CircularProgressbar>
				</div>
			</div>

			<div className={styles.left}></div>
			<div className={styles.right}>
				<div className={styles.row}>
					<div className={styles.column}>
						<h3 className={styles.label}>Hours</h3>
						<button onClick={() => increment(setHours)}>+</button>
						<div className={styles.count}>
							{hours.toString().padStart(2, "0")}
						</div>
						<button onClick={() => decrement(setHours)}>-</button>
					</div>
					<div className={styles.column}>
						<h3 className={styles.label}>Minutes</h3>
						<button onClick={() => increment(setMinutes)}>+</button>
						<div className={styles.count}>
							{minutes.toString().padStart(2, "0")}
						</div>
						<button onClick={() => decrement(setMinutes)}>-</button>
					</div>
					<div className={styles.column}>
						<h3 className={styles.label}>Seconds</h3>
						<button onClick={() => increment(setSeconds)}>+</button>
						<div className={styles.count}>
							{seconds.toString().padStart(2, "0")}
						</div>
						<button onClick={() => decrement(setSeconds)}>-</button>
					</div>
				</div>
				<div className={styles.action}>
					{isActive && (
						<>
							<button className={styles.button} onClick={stopTimer}>
								Stop
							</button>
							<button className={styles.button} onClick={resetTimer}>
								Reset
							</button>
						</>
					)}
					{!isActive && (
						<button className={styles.button} onClick={startTimer}>
							Start
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default CountdownTimer;
