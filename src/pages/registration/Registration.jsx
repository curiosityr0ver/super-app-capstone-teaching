import { useEffect, useState } from "react";
import bgImage from "../../assets/image 13.png";
import styles from "./Registration.module.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
	const navigate = useNavigate();
	const [name, setName] = useState();
	const [checkWarning, setCheckWarning] = useState(false);
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [mobile, setMobile] = useState();
	const [shareData, setShareData] = useState(false);
	const [location, setLocation] = useState({
		city: "Mumbai",
		country: "India",
	});
	const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;

	useEffect(() => {
		if (localStorage.getItem("currentUser")) {
			navigate("/genre");
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setCheckWarning(true);
		if (!name || !username || !email || !shareData) return;
		else {
			const currentUser = { name, username, email, mobile };
			localStorage.setItem("currentUser", JSON.stringify(currentUser));
			localStorage.setItem("location", JSON.stringify(null));
			localStorage.setItem("selectedGenres", null);
		}
		console.log(JSON.parse(localStorage.getItem("currentUser")));
	};

	return (
		<div className={styles.page}>
			<div className={styles.left}>
				<div className={styles.leftHeader}>
					<h1 className={styles.bgHeader}>
						Discover new things on <br></br> SuperApp
					</h1>
				</div>
				<img src={bgImage} className={styles.bgImage} alt="Registration" />
			</div>
			<div className={styles.right}>
				<div style={styles.rightHeader}>
					<h2>Super app</h2>
					<h3>Create your new account</h3>
				</div>
				<div className={styles.form}>
					<div className="form-group">
						<input
							type="text"
							name="name"
							placeholder="Name"
							className={styles.input}
							style={{
								border: checkWarning && !name ? "1px solid red" : "none",
							}}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label
							className={styles.label}
							style={{
								display: checkWarning && !name ? "block" : "none",
							}}
						>
							Field is required
						</label>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="username"
							placeholder="Userame"
							className={styles.input}
							style={{
								border: checkWarning && !username ? "1px solid red" : "none",
							}}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label
							className={styles.label}
							style={{
								display: checkWarning && !username ? "block" : "none",
							}}
						>
							Field is required
						</label>
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input}
							style={{
								border: checkWarning && !email ? "1px solid red" : "none",
							}}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label
							className={styles.label}
							style={{
								display: checkWarning && !email ? "block" : "none",
							}}
						>
							Field is required
						</label>
					</div>
					<div className="form-group">
						<input
							type="tel"
							name="mobile"
							placeholder="Mobile"
							className={styles.input}
							style={{
								border: checkWarning && !email ? "block" : "none",
							}}
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
						/>
						<label
							className={styles.label}
							style={{
								display: checkWarning && !mobile ? "block" : "none",
							}}
						>
							Field is required
						</label>
					</div>
					<div className={styles.checkbox}>
						<input
							type="checkbox"
							value={shareData}
							onChange={(e) => setShareData(e.target.checked)}
							className={styles.checkbox}
						/>
						<label htmlFor="mobile">
							Share my registration data with Superapp
						</label>
						<label
							className={styles.label}
							style={{
								display: checkWarning && !shareData ? "block" : "none",
							}}
						>
							Check if you want to proceed
						</label>
					</div>
					<button
						className={styles.submit}
						type="submit"
						onClick={handleSubmit}
					>
						SIGN UP
					</button>
				</div>
				<div className={styles.footer}>
					<p>
						By clicking on Sign up. you agree to Superapp{" "}
						<span>Terms and Conditions of Use</span>
					</p>
					<p>
						To learn more about how Superapp collects, uses, shares and protects
						your personal data please head Superapp <span>Privacy Policy</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Registration;
