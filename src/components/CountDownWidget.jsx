import React, { useEffect, useState } from "react";
import styles from "./CountDownWidget.module.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { set } from "mongoose";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function CountDownWidget() {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(30);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!isActive) {
			setFixedHours(hours);
			setFixedMinutes(minutes);
			setFixedSeconds(seconds);
		}
	}, [seconds, minutes, hours]);

	const [fixedHours, setFixedHours] = useState(0);
	const [fixedMinutes, setFixedMinutes] = useState(0);
	const [fixedSeconds, setFixedSeconds] = useState(0);

	useEffect(() => {
		let intervalRef;
		if (isActive) {
			intervalRef = setInterval(() => {
				if (seconds === 0 && minutes === 0 && hours === 0) {
					setFixedHours(0);
					setFixedMinutes(0);
					setFixedSeconds(0);
					setIsActive(false);
				} else if (seconds === 0 && minutes === 0) {
					setHours((prevHours) => prevHours - 1);
					setMinutes(59);
					setSeconds(59);
				} else if (seconds == 0) {
					setMinutes((minutes) => minutes - 1);
					setSeconds(59);
				} else {
					setSeconds((prevSeconds) => prevSeconds - 1);
				}
			}, 1000);
		}
		if (seconds > 0) console.log(duration());
		return () => clearInterval(intervalRef);
	}, [isActive, seconds, minutes, hours]);

	const handleIncrement = (type) => {
		if (type === "hour") {
			if (hours < 59) {
				setHours((prevHours) => prevHours + 1);
			}
		} else if (type === "minute") {
			if (minutes === 59) {
				setMinutes(0);
				setHours((prevHours) => prevHours + 1);
			} else {
				setMinutes((prevMinutes) => prevMinutes + 1);
			}
		} else {
			if (minutes === 59 && seconds === 59) {
				setMinutes(0);
				setSeconds(0);
				setHours((prevHours) => prevHours + 1);
			} else if (seconds === 59) {
				setSeconds(0);
				setMinutes((prevMinutes) => prevMinutes + 1);
			} else {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}
		}
	};
	const handleDecrement = (type) => {
		if (type === "hour") {
			if (hours > 0) {
				setHours((prevHours) => prevHours - 1);
			}
		} else if (type === "minute") {
			if (minutes > 0) {
				setMinutes((prevMinutes) => prevMinutes - 1);
			}
		} else {
			if (seconds > 0) {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}
		}
	};
	const handleStartStop = () => {
		setIsActive(!isActive);
	};
	const duration = () => {
		const curr = seconds + minutes * 60 + hours * 3600;
		const total = fixedSeconds + fixedMinutes * 60 + fixedHours * 3600;
		const res = curr / total; // this is a fraction ranging from [0, 1]
		return res * 100;
	};

	return (
		<div className={styles.widget}>
			<div className={styles.left}>
				<CircularProgressbar
					value={duration()}
					text={`${hours.toString().padStart(2, "0")}:${minutes // text attributes gives us the value that needs to be shown inside the progress bar
						.toString()
						.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
					strokeWidth={3}
					styles={buildStyles({
						rotation: 0.25,

						// Text size
						textSize: "16px",

						// Can specify path transition in more detail, or remove it entirely
						// pathTransition: 'none',

						// Colors
						pathColor: "#FF6A6A",
						textColor: "#FFFFFF",
						trailColor: "#191E39",
					})}
				/>
			</div>
			<div className={styles.right}>
				<div className={styles.configurator}>
					<div className={styles.column}>
						<p className={styles.label}>Hours</p>
						<GoTriangleUp
							className={styles.label}
							onClick={() => {
								handleIncrement("hour");
							}}
						/>
						<h3>{fixedHours.toString().padStart(2, "0")}</h3>
						<GoTriangleDown
							className={styles.label}
							onClick={() => {
								handleDecrement("hour");
							}}
						/>
					</div>
					<div className={styles.column}>
						<p className={styles.label}>Minutes</p>
						<GoTriangleUp
							className={styles.label}
							onClick={() => {
								handleIncrement("minute");
							}}
						/>
						<h3>{fixedMinutes.toString().padStart(2, "0")}</h3>
						<GoTriangleDown
							className={styles.label}
							onClick={() => {
								handleDecrement("minute");
							}}
						/>
					</div>
					<div className={styles.column}>
						<p className={styles.label}>Seconds</p>
						<GoTriangleUp
							className={styles.label}
							onClick={() => {
								handleIncrement("second");
							}}
						/>
						<h3>{fixedSeconds.toString().padStart(2, "0")}</h3>
						<GoTriangleDown
							className={styles.label}
							onClick={() => {
								handleDecrement("second");
							}}
						/>
					</div>
				</div>
				{isActive ? (
					<>
						<button onClick={handleStartStop}>Stop</button>
						<button className={styles.stopreset}>Reset</button>
					</>
				) : (
					<button onClick={handleStartStop}>Start</button>
				)}
			</div>
		</div>
	);
}

export default CountDownWidget;
