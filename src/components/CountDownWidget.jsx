import React, { useEffect, useState } from "react";
import styles from "./CountDownWidget.module.css";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

function CountDownWidget() {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(50);
	const [seconds, setSeconds] = useState(50);
	const [isActive, setSsActive] = useState(false);

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

	return (
		<div className={styles.widget}>
			<div className={styles.left}>
				{`${hours.toString().padStart(2, "0")}:${minutes
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
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
						<h3>{hours.toString().padStart(2, "0")}</h3>
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
						<h3>{minutes.toString().padStart(2, "0")}</h3>
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
						<h3>{seconds.toString().padStart(2, "0")}</h3>
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
						<button>Stop</button>
						<button>Reset</button>
					</>
				) : (
					<button>Start</button>
				)}
			</div>
		</div>
	);
}

export default CountDownWidget;
