import { useEffect, useState } from "react";
import bgImage from "../../assets/image 13.png";
import styles from "./Registration.module.css";

const Registration = () => {
	const [name, setName] = useState();
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [mobile, setMobile] = useState();
	const [shareData, setShareData] = useState(false);

	// useEffect(() => {
	// 	// console.log({ name, username, email, mobile, shareData });
	// }, [name, username, email, mobile, shareData]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !username || !email || !mobile) {
			alert("Please fill all fields");
			return;
		} else {
			localStorage.setItem(
				"currentUser",
				JSON.stringify({ name, username, email, mobile })
			);
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
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="username"
							placeholder="Userame"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="tel"
							name="mobile"
							placeholder="Mobile"
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
						/>
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
					</div>
					<button type="submit" onClick={handleSubmit}>
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
