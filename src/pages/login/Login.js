import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const previousURL = useSelector(selectPreviousURL);
	const navigate = useNavigate();

	const redirectUser = () => {
		if (previousURL.includes("cart")) {
			return navigate("/cart");
		}
		navigate("/");
	};

	const loginUser = (e) => {
		e.preventDefault();
		setIsLoading(true);

		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setIsLoading(false);
				toast.success("Login Successful...");
				redirectUser();
			})
			.catch((error) => {
				setIsLoading(false);
				toast.error(error.message);
			});
	};

	// Login with Goooglr
	const provider = new GoogleAuthProvider();
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((res) => {

				toast.success("Login Successfully");
				console.log(res.user.accessToken);
				redirectUser();
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<>
			{isLoading && <div>Loading...</div>}
			<section className='container form-container'>
				<div className="img">
					<img
						src="https://www.planstudyabroad.uniagents.com/images/login.png"
						alt="Login"
						width="400"
					/>
				</div>

				<div className="card">
					<div className="form">
						<h2>Login</h2>

						<form onSubmit={loginUser}>
							<input
								type="email"
								placeholder="Email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="submit"
								className="--btn --btn-primary --btn-block">
								Login
							</button>

							<p>-- or --</p>
						</form>
						<button
							className="--btn --btn-danger --btn-block"
							onClick={signInWithGoogle}>
							<FaGoogle color="#fff" /> Login With Google
						</button>
						<span className="register">
							<p>Don't have an account?</p>
							<Link to="/register">Register</Link>
						</span>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
